**make-default**: ./create-schemas.js schemaconf.json
	./create-schemas.js --overlay schemaconf.json

all: mod-inventory-storage-virgin mod-inventory-storage-rewritten mod-inventory-storage-overlaid

mod-inventory-storage-virgin:
	./create-schemas.js --fetch schemaconf.json
	rm -rf $@
	mv mod-inventory-storage $@

mod-inventory-storage-rewritten:
	./create-schemas.js --fetch --rewrite schemaconf.json
	rm -rf $@
	mv mod-inventory-storage $@

mod-inventory-storage-overlaid:
	./create-schemas.js --fetch --overlay schemaconf.json
	rm -rf $@
	mv mod-inventory-storage $@

clean:
	rm -rf mod-inventory-storage* mod-search

distclean: clean
	rm -rf node_modules yarn.lock

