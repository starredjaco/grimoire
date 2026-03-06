The librarian is an agent that helps you get info from external codebases, knowledge-bases and documentation.

There are two ways to interact with the librarian. You can ask it a directed question `Hey can you explain how function XYZ should be called? Does it ensure ABC?`. You can also ask it to generically study an external subject `study the ERC4626 specification, find me best practices and common vulnerabilities` with the goal of priming context for future questions.

In general you'll probably want to use the first method as it provides for a cleaner context for the main thread. However sometimes this is desired so it's up to you!

The librarian should automatically be used whenever there is a need for information that can not immediately be found in the codebase. It's better for agents to use the librarian than to guess based on their own knowledge.

The librarian is extremely detail oriented and will only produce claims backed up with references. It's goal is never to provide answers on it's own, but to provide answers based on external data sources. 

## Sources
Librarian usually builds on the following sources:
* context7
* exa
* solodit
	* https://github.com/marchev/claudit
* various web3 security knowledge bases
	* kaden: https://github.com/kadenzipfel/smart-contract-vulnerabilities
* github
	* gh cli skill dependency
* [[personal grimoire]]

## Resources
* ampcode - https://ampcode.com/manual#librarian
* pi librarian skill - https://github.com/superresistant/librarian