# etchosts

i am really bad at bash scripting, so here's a dependency-less node utility for updating hosts files.

1. clone repo
1. `cd etchosts && npm install -g .`
1. `etchosts enable <some-domain>`

by default hosts map to `127.0.0.1`, but you can specify a different ip as follows: `etchosts enable <some-domain> 0.0.0.0`

other commands include `etchosts disable <some-domain>` (comment out) and `etchosts remove <some-domain>` (remove from hosts file).
