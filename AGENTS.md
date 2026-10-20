# Architecture rules
- Keep catalog items and exchange eligibility in src/lib/items.ts so every swap entry point uses the same item rules.
- Use one shared transaction dialog for catalog, detail, and matchmaking to keep approval and payment gating consistent.
- The sample wardrobe and submitted swap history are browser-local demo data until real collection ownership and swap fulfillment are connected; never present demo QRIS as payable.