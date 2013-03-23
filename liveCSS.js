$(function () {
	$("#tabPanel li").click(changeTab);
	$(".cssProp").change(updateCSS);
	$("#compileTrigger").click(generateCSS);
	
	$.ajax({
		url:"demoCSS.json.get"	// Replace with applicable API GET
	}).done(setCSSValues);
});

function setCSSValues(data) {
	for (var section in data) {
		for (var prop in data[section]) {
			var target = $(".cssSection#" + section + " .cssProp[name='" + prop + "']");
			target.val(parseValue(target, data[section][prop]));
			target.trigger("change");
		}
	}
}

function parseValue(element, value) {
	var units = element.closest("tr").find(".units").text();
	return value.replace(units, "");
}

function changeTab(ev) {
	var el = $(ev.currentTarget);
	var target = $(".cssSection#" + el.text());

	$("#tabPanel li").removeClass("selected");
	el.addClass("selected");
	$(".cssSection").hide();
	target.show();
}

function updateCSS(ev) {
	var el = ev.currentTarget;
	var target = $(el).closest(".cssSection").attr("id");
	$("#demoCanvas").contents().find(target).css(el.name, getValue(el));
}

function getValue(el) {
	return el.value + $(el).closest("tr").find(".units").text();
}

function generateCSS() {
	var css = {};
	$(".cssSection").each(function () {
		var target = this.id;
		css[target] = {};
		$(this).find(".cssProp").each(function () {
			css[target][this.name] = getValue(this);
		})
	});
	alert(JSON.stringify(css));		// Replace with applicable API PUT
}