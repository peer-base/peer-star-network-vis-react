# peer-star-network-vis-react

React Component for [Peer-*](https://github.com/ipfs-shipyard/peer-star-app) collaboration network.

[![made by Protocol Labs](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)

[![Build Status](https://travis-ci.org/ipfs-shipyard/peer-star-app.svg?branch=master)](https://travis-ci.org/ipfs-shipyard/peer-star-app)

![Example](docs/example.png)

## Example

```js
import PeerStar from 'peer-star-app'
import NetworkVis from 'peer-star-network-vis-react'

dApp = PeerStar('my app')
await dApp.start()
collaboration = await dApp.collaborate('collaboration name', ...)

// inside react component.render:
<NetworkVis collaboration=collaboration />
```


## License

MIT
