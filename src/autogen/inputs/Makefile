COPIES = inventory.raml instances.json items.json item.json

**make-default**: $(COPIES)

%.raml: ../../../../mod-inventory/ramls/%.raml
	rm -f $@; cp $? $@; chmod ugo-w $@

%.json: ../../../../mod-inventory/ramls/%.json
	rm -f $@; cp $? $@; chmod ugo-w $@

clean:
	rm -f $(COPIES)
