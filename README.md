# Necronancy Demo Node

It is recommended to install the required packages for a substrate dev environment as described [here](https://docs.substrate.io/install/).

to build and run a standalone development node, use `cargo run --release -- --dev -- --dev`.
you can then connect to it via the included UI app or the generic [Polkadot Apps UI, connected to your local node](https://https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944). (Manually submit transactions [here](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/extrinsics) and manually query chainstate [here](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/chainstate)).

any non-boilerplate/non-template code is located in `./pallets/`.

Below is the *idea* of the pallets we want(ed) to implement - they are liable to be unimplimented.


(95% Completed) `pallet-frontendstore` - simple onchain storage of arbitrary data, intended to be used for storing a frontend bundle to enable decentralized frontends/allow users to load a frontend from onchain. Only "root" is allowed to update this bundle.

(20% Completed) `pallet-depositdispute` - simple slashable deposit mechanism created for collateral and disputes - any party relevant to a deposit should be able to dispute it, but the origin able to resolve a dispute should be some *legitimate collective* made privy to the context of the dispute (out of channel/offchain). 


(0% Completed) `pallet-invoicebook` - storage of encrypted onchain "invoices" with a configurable maximum size and TTL. invoices have plaintext recipients but senders only need self-identify optionally. A destination tag value allows the chain to prefilter externally submitted receipts without requiring the submittor to have an existing onchain account.


(20% Completed) `pallet-dexmint` - mint and manage tokens (which must be shares of a new LP, or the second token in a pair of a new bootstrapped LP) and LPs. The intention is that you may create a new token representing a real-world asset of your description, but it must be collateralized by at least one, existing onchain assets. 

(0% Completed) `pallet-dexgraph` - provides data to the frontend required to calculate a route between LPs in order to execute a given trade, accepts routes from the frontend to execute a trade.

# Substrate Cumulus Parachain Template

A new [Cumulus](https://github.com/paritytech/cumulus/)-based Substrate node, ready for hacking ☁️..

This project is originally a fork of the
[Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
modified to include dependencies required for registering this node as a **parathread** or
**parachain** to a **relay chain**.

The stand-alone version of this template is hosted on the
[Substrate Devhub Parachain Template](https://github.com/substrate-developer-hub/substrate-parachain-template/)
for each release of Polkadot. It is generated directly to the upstream
[Parachain Template in Cumulus](https://github.com/paritytech/cumulus/tree/master/parachain-template)
at each release branch using the
[Substrate Template Generator](https://github.com/paritytech/substrate-template-generator/).

👉 Learn more about parachains [here](https://wiki.polkadot.network/docs/learn-parachains), and
parathreads [here](https://wiki.polkadot.network/docs/learn-parathreads).


🧙 Learn about how to use this template and run your own parachain testnet for it in the
[Devhub Cumulus Tutorial](https://docs.substrate.io/tutorials/v3/cumulus/start-relay/).