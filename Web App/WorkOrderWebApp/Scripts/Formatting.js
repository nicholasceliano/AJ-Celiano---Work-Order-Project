var Formatting;
(function (Formatting) {
    function TodaysDateTime(DateOnly) {
        var day = new Date().getDate(), month = new Date().getMonth() + 1, year = new Date().getFullYear(), hour = new Date().getHours(), minute = new Date().getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM'; //
        hour = hour > 12 ? hour - 12 : hour, minute = parseInt(minute) < 10 ? '0' + minute : minute;
        var date = month + '/' + day + '/' + year, time = hour + ':' + minute + ' ' + timeframe;
        if (DateOnly)
            return date;
        else
            return date + ' ' + time;
    }
    Formatting.TodaysDateTime = TodaysDateTime;
    function HandlePossibleStringDBNull(value) {
        if (value == null)
            return '';
        else
            return value;
    }
    Formatting.HandlePossibleStringDBNull = HandlePossibleStringDBNull;
    function FormatDate(val) {
        var d = new Date(val);
        return new Date(d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear());
    }
    Formatting.FormatDate = FormatDate;
    function FormatDateTime(val) {
        if (val == null)
            return null;
        var day = new Date(val).getDate(), month = new Date(val).getMonth() + 1, year = new Date(val).getFullYear(), hour = new Date(val).getHours(), minute = new Date(val).getMinutes().toString();
        var timeframe = hour > 12 ? 'PM' : 'AM'; //
        hour = hour > 12 ? hour - 12 : hour, minute = parseInt(minute) < 10 ? '0' + minute : minute;
        var date = month + '/' + day + '/' + year, time = hour + ':' + minute + ' ' + timeframe;
        return date + ' ' + time;
    }
    Formatting.FormatDateTime = FormatDateTime;
    function ContainsObject(obj, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === obj)
                return true;
        }
        return false;
    }
    Formatting.ContainsObject = ContainsObject;
    function CompareForLowestDate(currLow, compareVal) {
        if (new Date(compareVal.toString()) < new Date(currLow.toString()))
            return compareVal;
        else
            return currLow;
    }
    Formatting.CompareForLowestDate = CompareForLowestDate;
    function sortAsc(a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
    }
    Formatting.sortAsc = sortAsc;
    function sortDesc(a, b) {
        return (a > b) ? -1 : ((a < b) ? 1 : 0);
    }
    Formatting.sortDesc = sortDesc;
    function DropDownSelectionChange(e) {
        var sel = $(e.currentTarget);
        $(sel.children()).each(function (i, e) {
            if (sel.val() == $(e).val())
                $(e).attr('selected', 'selected');
        });
    }
    Formatting.DropDownSelectionChange = DropDownSelectionChange;
})(Formatting || (Formatting = {}));
//# sourceMappingURL=Formatting.js.map