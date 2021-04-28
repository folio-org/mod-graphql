var path = require("path");

/**
 * GET /instance-storage/instances?query=title=a*
 *
 * accept: application/json
 * content-type: application/json
 * x-okapi-tenant: diku
 * x-okapi-token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkaWt1X2FkbWluIiwidXNlcl9pZCI6IjUzMDAwZTM5LTliM2ItNWM2My1hYjE3LTcwMmJkMWM3ZGQ2MyIsImlhdCI6MTYxOTYwODU3OSwidGVuYW50IjoiZGlrdSJ9.qW59id7B4ijLBGZWBwiQ-LLXLHbkF_PHoCexhoMar5M
 * user-agent: node-fetch/1.0 (+https://github.com/bitinn/node-fetch)
 * accept-encoding: gzip,deflate
 * connection: close
 * host: folio-snapshot-okapi.dev.folio.org
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("date", "Wed, 28 Apr 2021 15:09:45 GMT");
  res.setHeader("content-type", "application/json");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "close");
  res.setHeader("vary", "origin");
  res.setHeader("x-okapi-trace", "GET mod-authtoken-2.8.0-SNAPSHOT.89 http://10.36.1.221:9178/instance-storage/instances.. : 202 30119us, GET mod-inventory-storage-20.3.0-SNAPSHOT.568 http://10.36.1.221:9134/instance-storage/instances.. : 200 4259us");
  res.setHeader("content-encoding", "gzip");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAAKrmAgAAAP//UlBQyswrLknMS04tVrJSiOYCAAAA//8=", "base64"));
  res.write(new Buffer("vFbbbhs3EP0VYp9sVLRJ7l19si27FhBIRuw0D0FR8DKUWK92VXLXiWP4z/rWH+vsSpatIC6MtqiexOHMmduZ4T5EzkTjCDKlWawzqnmc00QITlWWl1TmOtUxt2WR6WgU/XoHPrimjsZ8FC39YNrjsd1P5KgWms5rwLuL+bvpHAWta6v+PPcLWbsgW8QIlHS1IVe++QohQN1+dvq26uoFuZReVoacdIsutK4mB5c+LI4OEUdWLfgaze/gpofEHD79MorAuAFxcwrg3XATfVgFaL/2kAY8mUxn5HxGptdzUjLGx4LxlJDj19yRH8mpxAA5+j1FSL1sgcguDFin0KITFT473wa9lLZFrTe42yJilM5gys46LCiG+hDdyarrSxQXScLSPBEseql0c7+GaV/uQmScpYmlCvKi75ShyqScJmBKG8c6RlH0OHoGLPNihxn/f5gCChWrTFMGuUGkpKBKS0EVUyJWcZ5Jm+5hHszPmndnh5yJhJUp4/z7uDmkJedlTjGwlCbSKsTNDJWZyTMtYyWReXu4k3PKGT/kHEHztHwt4H8EnJbl4WR2+t9gIyt0UyOxVNc2W1rUctX7eiLnaMvWaE91hkrPhVdlorOYU6tlSZOiFDjFMaMsBkhFaS0IOeSxhb5eyluk68/gK7kgP63U5d+BYx8h5zHluY1pgtuCytIWVCAdUqUEZ1IOiYRO/Qa6Hcbwe5OAPq5xDRnp+1x2e6HxDscJw/mId1Dh1XY/rGQtF7DCyqLs3NX2zz+WHkcNT9PaYG1wHPH/BLp+Hiu07odMVzIEbIWWT/vh4RvZrFsp8JhZlhZHCeN9A/c1drknIsm5tCXNjcAm2lhSZXFeMmZEabRNslgNhX3VA/u34JjSulPV1nhIZziH5eBhr5Xoa13JYQ2fSKxpjQIjW5jbq5cQEXYj/xb5wsPvHdT6frNRX9y8l/UCtlu3wgb7pnb6RONzsqlu5x1iLtt2PT4+NrRWR9ir5vh5QI5ZgoFUrr69gS8t6p7vYIiHzctBDq4mF/2+3zieNe2QhTGoEIhtPJGDR4ertl0CaaWqgDSW9LRFihwRtCfWVZuhenrxdsXG6RCG54Japi1NmM2oErilSisLCxKHVNjo2e6i8SvZTs32fdkXb4Xr5X3AElUTCNq79RPdoi8jwnlMrsFhYGRaVT1Vh0riUXCiVyMiREwWPV2RtosOaT5YLrClKKsx+ScfHu5c04Xq/hJwBYytrAJgU3FkGnyY76+79doPjdjeYJytw7WBcZ01BnYZ9PIufFj3dDATOVRXMHzzWUJFccPiMWfjNDnKSvZD/6hjLVbQSlSX0Rj57eFNhuPBsnujm177Eb8qmspgX8N70I03QWwixje/80jds02Db8Cvttk8/gUAAP//", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("zFjJbuNGEP2Vhk8JICoUd+ZmGEhgxM5MbCPOtZei1DBFElwsK/n5vGpSEp2ZOOOBguQ2Q3V3ba/qvfKkYWJVhKlPvpdpLb3I5NrLMK+8eJX6UgXSl2H+ZRomeEvDXIqOMI2QVbEjJZrWblEphoWhl4fp0P1nj7xTvlzVdUOtOy64ixhuOCe6fdfTtntLRfhBgr7GOD4j4x/fDM70ZuD7oZ/EqyT+/IM6izOKisALVKK8KMxiL4sChZmYhgHRKpJKvc2aVY+5Ug8L8WNr18wtr6ntNBDIz03EEyCmANDJpJeFK+UVaZqqjIrEZKtPr04D7Ixc/KusmOC3GK2g+h9aWT39Lz3+C8Ef0f5I6p206wfx0jHCv0S6Dz/FAOUyyzKo7+VlnAmg7g17mlaQppo8GYfkRSqCSJMZzAcxmVQFZKT+Rx6+vX7AXsOT+MTBV3KrMGzWtBC3sLwUf0PHevKvrd0g+Xh89kwU/V/zIQgRYlE0S/G9sGW5xJoVRKDB5ScESNV6ToB/uH/B2+tKl4OhTiiLmOt1K5sNm4J8KKglXm0Fr1luIC8vHN0VxYeq3B+J8eAyK4tTFmQQh6HE+mu4pSiJMG6SxPPTSAeFzEM/02Ozjn48QHkYeqaybliXsv5gMTJvhoXY2X4jttBftiIPvGmcVJl0ykJsZOcuNTX/3yKIvkYcz3U5cMrs7+R+fqxbbKiPmJH86hhd34mhIwDp8pVJAI/ZBqRTP1vjUoFMAARm0I49+PJ64Kdgqt/Yznljq8EpC8G2n1lYYRSXZoEIuYCKv7DJJ9oL3JXdQhyLtXBv9qQ3VV3Wa8tO3Q92VGWs1uCnQKASZ156VddPAh/5By5RQxWPftH1g9kLtWfPCxZ3dYViLWCVHdQ4AipEPAhhwI0WdTcDvngl10AU+Ci5DsihO9/03ckvi17hTMseFSlLQZVzjgsC6uRMwKomMmPB1GCdChGyaQ5t5SyjGLYV9a6aEDYhkV6o1bbjVOAdnotT3kbgjwmSFYDDUmgOVFduRCAZQBVkMQEtUAmAArLIEEOJWiMmjTCCDDXboQioFjJrXFYdkhQRu1i39bDe8K+j9JpQ2Nl15QYeTFW0O9oZ0wKfeFhwldBQ1uD6BO4jGOAPK7852I0tXCj9CQ3imw+PN8FCtAMEzrdITYPgR5Q7mYozfPsOCp2zgsMMssJWBzXPMlNsoVfLOT7gD279dnszyzzfmL/5c/jdw9BCWLkzsCC5O/RGNohUWP7TzXPNBUDWRyfZHufiMbwS3bSPctpx9pBxFKIWmIIsQJEdM352KDtZ5ncAsXZ/zIO4/3h598vNaIJzcfrl7noMfWx8IF3Z0vYuPnQq3hwbVVG/44K6RLoL6FNusP0s2Q5YM5COmDmEjFdezYZXcD5W3HnINZ+Ps+4QViO7HvHvxJ5k68YNJ+xogevfjSPBtTQ+bg9N0J17+IIOGBgfiuuuG/gNdzc3q0z6QeHFWY4HNNRLvvITT+cQiLFOJWWKGR+4QvZmq8gq51XEZ/l5nt3qQsV5kumcPG2M9qI4Tbw8p9DLKPElmUz5xv1hYtzARu+TMJKxVF4eBJDNqR96Shas6VYBKZ2mJk4uvnxng875up0tW0Xv2NlOp79mZ/sTAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("gvbZ0sxTLYwSDVOBzU1ghJkkWRjpJiUZpuimJBobmSUnGZtbJKcS1WcDD9zg7LO55+QnAXOsY1oRML5I7ojh6WdBBy0tLQwNDc0tzak9tBjl4mRkaWBqbAjs+VB3ZBGtBe+bnwdqSKWBR98UglIzM1JJbMgbG9B6dCsovxQYVeAWdEhiZQ6wrFEDd5GAFS+wf5dfWoDU2vbJz0sBFn5+wJIqMr8oG8/Ql+4waVg7HV4CrCcJNaIHYhTJwsSEzBLJhKQSyYSSEgkAAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("3JlBb9pAEIX/yiqnVmKRvbu2d8nJgigKEi3qJWqlHuz1uqIxpjVyVFT1v/eNDRSSmIRU7qFXaxmbGc03895uiSS93FrtIp7QeFAyVzwNleBQflZqk6vA819EJO8kkWhKx0u6VsJ+PsUp2igwcWdgkMUW2AGpn4+ePoz19U+s5TYWe9Nulm8bxjwRIF4O2XRI57tOXFe0iWxjNx1zPivj6ewq/vQ0xgIjU7A+5WgIyRVmH4agtjyUeRa40GjjwiNCkk3HjVQdxDW+BJBSQb5FxlVoEq4BaG59zwhrjC9EdBQP/10Zsv6ijnu315pRD0A7RiEasborDp8jdauMntG6dFD/a1c6t76rt219Bos/jEOPzI6/tTm6bZVbn8UzZU7cliRRrjJP5hwrD9YaE1qeuBQQdMZmaRhpQZ36DPIndcknq7J0RQHdCXgP2XjVWCc70D9DeN+o8H8h/P1w0DomIjrLL5lXC5LXdboPxyy9FDnNSG9PnEVMzw979EpmyYb5Rms+gn6germ2ARL8nZgE1l3ZiOpWjBzTpreP2ntrI3b1w7rqG3Rn03/JgFxCzS/3C8SAvfvIcAwvvwcV2E3Z5kzy/j6PBnHhWi22gN5BtRZV5b7URVIVmwHlU/RYsvc5eprsgYOJQsWJ1+sVnu/ciHnr1gB2h+OL8hf0mJsb8vaQkO/1oqReLvGhxQbyeXR6EgaNimW2XiKL24sVROpBp/77NUu/Vvg1P3zxmrU/ff6adeElqXNOZlwnGbKXIrYRec6F8FOVYyh5UXDx+ddvAAAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("3FpNb5tAEP0rc3QkY2EM6+XouFWbKq6iEkW9Al7sVWHXMiat8uv7BtZOpNr5cMkll5URyyxmZ/a9mTeOjMlM+VFeRF6B28iNo8CTfoxPDviKl74ssvh1kl5bUj8t6ZlVab0k/QOXrlLTdAclog6XOoeDa86KijSvdaVLRXe2bCr4eAQ02m6amuZYFFuHSxyqnKAcqv10dTWkRZLQOEDEhiEGwb+mEoOUbRTjtBERBolhEgQ8iCGFYexWBzjQbETfR/TJpkznmHuxCG6WtNRb4JTdXrCssEN8/qbbEX1t6hqAOUhdrCrqHsGsmzUwRG8ApmWtU2NpUFhQDC6luTlvFyo56hWYVFd2UybFccWRQ6w3dTWqZNdgTk333acLY+4Te3LxDG+U0p+AsE1OqITRcizCIsw8P0OaHCpw9VRNIy8v8kIidYarxf9ImVIwpwRz60nKPBjssWursxlFQdzrS8JgX/96X/0QAUiwFGFf1Y/OrM3NO1nu3awr13y5vHvBWf+7Eey6yVl7uVFcfP3Wo/Q82+oHa1KaKy5Bt6Xck2HtgrnnPrGjOc4LCcJsvviRDOm8l9/nELeq2qiDkdO1IvFBEgkR00L/crBW05gu1apUepc1+ZoGPxmxxmLqepYujuYZgIh2BIk6mnMANVTZ9vcCWwH6hh4aFjSULvWKtwhZbw20vbfVfvW1apto340w0megPPzGiWFq5Zi1oafwz95yjS00H4ESxudqAd2Dr6WEj7PPqbz9BQAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("5JtLboMwEECv4gMkEGMKtbJupUpFqtRFK1Vd8DFgFXDFJ1Q5T26Si3UMCCK1kJA4m3YPgxcz+M34uYM92MZXIYDRMjRMIjdyOSTG/pIyzCzDI9jGwWmwdzMFe/dVc5K3QB4XqdS4/ZZQMlblovC5PJeVJiL0CVAOjxXfIkdUkBGxAMZKXPipo2fxAWW96IipmE9MD1kmNm0D0n8KFhOLoDtBb9izd16lpj61ErTumbQRYucF71+dgDC8AjYnlOBXRRRGCKaWSSgd8bzPctKvFtNsOwiF0CTphhoQ3yaWYrpRHXagm2NZcDHeDPkt012l5d5VbFs2qgW4n9dBioTFuZziOofi+guXN13aJ5KmqXSauhwZ8B6Bnyc3iXIXqtxxfehLYZM+9M1iNx1BmTdgmdv3KznfdV1rkbfRAqYHaaFvvVofskb7DMJ/ZX9/cem7GebvAvjJI9y7rIz3u6REFGiJl/l+F7E/ASi2dSag2LMAxb4EUL4BAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("gjZQEoFNkCRjoNmmRhbJwKIeWOhbmgEbKMAOn7mJpbFxkompCXELzM3wNVCI2EZGtR1yxGxsw7f8AaVqMLEwMTIzolXVQPUtUJT3Pgd8v83AFm+DcMeKpSWZaw0gGokuUCwpWWsAAAAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("gu1YMQFGSoplqq55mkUqaBF/qq5lojnQNoMUI1NDC2BfyMyMuALFAu/wdjpo0Bp5762OQlBmcWZ2PmQLLrCpAExkCoiWyiDbgQvq01B3By7erg5sZ6sxtcZdkXbLUnN8mJCZlOzANTSyMDKhaAwT5w5cMzNTHOPPlO/ApdRselY/g2sHLqQ8wLPLFs8W3dENuIOmQUBgAy4of4zADbgmFvg34BpaWAzGDbimekAhcpozII3Eb8BFVk1OcwYAAAD//w==", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("3FzLbtswEPwVfoAcxHETp70ZSZFeAgTwoWeaoiIhpEiIchPl6zOzlF2ngJune+jNomhqtSR3lrs7Gt0ZMy1nKzs9mVhjcT6qpKZ9Nmc5+/zk/HQOl+b0dQHcry+VThryJWJI/YR8gK7lJX2QXNG0wDwyip9DIG90WZaLq+9qhb1Xe93dSazUrB3fXsLETKjbfngxVjo/np7tAeb3ZKynXxhBwaifRej9M6r3F3k/nrSUqShkXj479AYMK4lWN1gMeS0QhhbrClD1mLT3/KTMG6Hox+EKJw9fJs/1+6wSPjHBZckh2qmKv7SubtQSG13HgKX9U6caFz1uX16oa+tWrJ6y+yHr/P88w+6LwF3AWJBuBVWlRmiIlbqlGVb3FgamFtsQiQL9UPBmHWI2GKVNUTedNEo1Tk5Jw7q2wQNzywG7pEnYHjphMOekCrLTG/oZ+yYCLCeYz7i33ZFa5pEkX0WIyTmseg0PLksKJyw43SVVM0JMwX6zufq6s+SuGk3y4q1t+ZUBWwpV1AuCSe5IToWQOsLARcwbGjP4e31H5Gcoe8t++8WBTfDR2YcsAd0B+SWcNPR8Nk7PN10FaG4cYKOQYldLMbhG4HOrpnHMrdTF2I81rqRxCp+ObLumzTJUku/bpbZljlyFBT6WI6VCWjDHwzdFQzK53qBKkfmiVTA4d3ruFPtg4EPgHchIbEdeI0DRYx/pbhBoKpQLQXSke+kxWixqntxMaXNUX15IQk9qHvV2xgXaTHCBhY15cfgAUO4VNGa7QxDr/r1zM3tXdnrzx1c7N7OPBH+fAAAA//8=", "base64"));
  res.write(new Buffer("0uECAAAA//8=", "base64"));
  res.write(new Buffer("xFxRT8IwEP4rfRMTprsNxvCNYEx8QB8m0fjWsQ4bpTOAMf57v+sKDiOEjIEPBAa0u9x9u/t6vasjN1HakcqHp1ek4PhDyj2ZxyEuKQzzWIWZ9PciN7ST3IyKVA+L2Rn1RFfMZndqucDntrifLAtEEEER1ybzN4kpPlM9z9pi/IBXMhCX7qF44+5MPV9cYamqOfLinYtftHoRrbHRVsSy3xR8WJtCLxin43kquYYGA+CwpsZOet4WT9p8fYhnThL9Hj4EOOEQAFKRwHlcazUtymFbeNefzSUEWN9A3qUYDEfc6/66gPcUIy5UnNlCp0f2YdDFJ/8GLm/syiNx56DUa0cB66EApKqzJWNQj6V1ATdqLs2zydJ2ynt4hqOqfPihrfq39ZybNhBky+F7VVQu5cvBeYyfJMkawu0VqhvMwFhwO6Q3OK17mEUQHls71aJ8jtC46zvvpE95b5jPnkBgShB7Oa7eco0cKEXZNGktXfx0oK8MOsYzhLgIxyrLELueskmxD4Kc1ekF+RcU7a9ZTooSycgLIQ7398GGQdT3sqwfkj9Jg8zfELH0wSe62cCYj5WFjHTnDCAqueMi1rZSFQOzapye+LLFOnXAOwfyKnJ7gd+06HX20I63bJDBpE8q7nlRKlPuIoy40SD1KM/8oBNTPumcZtnwL3QqrrWXvhq4N51a/7sOnfoGAAD//w==", "base64"));
  res.write(new Buffer("itUBHUFbkl+SmAPVo2QFTKE6XAAAAAD//w==", "base64"));
  res.write(new Buffer("UlACBkZpTolnXlo+UKgaTQ1QiVIasAKDRUtKZmJ6Xj4otCDmctUCAAAA//8DAAIXY9zcVgAA", "base64"));
  res.end();

  return __filename;
};
