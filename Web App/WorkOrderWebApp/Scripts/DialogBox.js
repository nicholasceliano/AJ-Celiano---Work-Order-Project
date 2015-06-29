var DialogBox;
(function (DialogBox) {
    function ShowWorkOrder(workOrder) {
        $('#workOrderDialog').html(WorkOrderBuilder(workOrder)).dialog({
            buttons: [
                {
                    text: "Reject",
                    click: function () {
                        workOrder.Reviewed(false);
                        workOrder.LastUpdatedBy("Nick");
                        workOrder.LastUpdatedDate(Formatting.TodaysDateTime());
                        JSONCalls.UpdateWorkOrder({
                            ID: workOrder.ID(),
                            Reviewed: workOrder.Reviewed(),
                            LastUpdatedBy: workOrder.LastUpdatedBy()
                        });
                        $(this).dialog("close");
                    }
                },
                {
                    id: "btnDialogAccept",
                    text: "Approve",
                    click: function () {
                        workOrder.Reviewed(true);
                        workOrder.LastUpdatedBy("Nick");
                        workOrder.LastUpdatedDate(Formatting.TodaysDateTime());
                        JSONCalls.UpdateWorkOrder({
                            ID: workOrder.ID(),
                            Reviewed: workOrder.Reviewed(),
                            LastUpdatedBy: workOrder.LastUpdatedBy()
                        });
                        $(this).dialog("close");
                    }
                }
            ],
            title: "Work Order #" + workOrder.ID().toString(),
            resizable: false,
            draggable: false,
            modal: true,
            width: "800px"
        }).dialog('open');
        $('#btnDialogAccept').focus(); //highlights 'Accept' button
    }
    DialogBox.ShowWorkOrder = ShowWorkOrder;
    function ShowDevice(device) {
        $('#manageDevicesDialog').html(ManageDevicesBuilder(device)).dialog({
            buttons: [
                {
                    id: 'dialogBtnDelete',
                    text: "Delete",
                    click: function () {
                        var parentDialog = this;
                        ShowDevicesErrorPopUp('Are you sure?', 'Are you sure you want to delete this record?', [
                            {
                                text: "No",
                                click: function () {
                                    $(this).dialog("close");
                                }
                            },
                            {
                                text: "Yes",
                                click: function () {
                                    $(viewModel.md.allDevices()).each(function (i, e) {
                                        if (e.ID() == device.ID()) {
                                            JSONCalls.DeleteManageDevices(e.ID());
                                            viewModel.md.allDevices.remove(device);
                                        }
                                    });
                                    $(this).dialog("close");
                                    $(parentDialog).dialog("close");
                                }
                            }
                        ]);
                    }
                },
                {
                    text: "Edit",
                    click: function () {
                        $(this).html(ManageDevicesBuilder(device, true)).dialog({
                            buttons: [
                                {
                                    text: "Cancel",
                                    click: function () {
                                        DialogBox.ShowDevice(device); //reverts back to previous page and removes edits
                                    }
                                },
                                {
                                    text: "Save",
                                    click: function () {
                                        var parentDialog = this, save = true, GUIDVal = $('#txtGUID').val(), userNameVal = $('#selUserName option[value="' + $('#selUserName').val() + '"]').text(), deviceNameVal = $('#selDeviceName option[value="' + $('#selDeviceName').val() + '"]').text();
                                        $(viewModel.md.allDevices()).each(function (i, e) {
                                            if (e.UserName() == userNameVal && e.DeviceName() == deviceNameVal && e.GUID() == GUIDVal) {
                                                if (e.GUID() == GUIDVal) {
                                                    //Error -- value already exists
                                                    ShowDevicesErrorPopUp('Error', 'Record with that User/Device/GUID combo already exists.', [{
                                                        text: "Ok",
                                                        click: function () {
                                                            $(this).dialog("close");
                                                        }
                                                    }]);
                                                    save = false;
                                                    return false;
                                                }
                                            }
                                        });
                                        if (save) {
                                            device.UserName($('#selUserName option[value="' + $('#selUserName').val() + '"]').text());
                                            device.DeviceName($('#selDeviceName option[value="' + $('#selDeviceName').val() + '"]').text());
                                            device.GUID($('#txtGUID').val());
                                            device.LastUpdatedBy("Nick");
                                            device.LastUpdatedDate(Formatting.TodaysDateTime());
                                            //Save this to Database
                                            JSONCalls.InsertManageDevices({
                                                ID: device.ID(),
                                                UserID: $('#selUserName').val(),
                                                DeviceID: $('#selDeviceName').val(),
                                                GUID: device.GUID(),
                                                LastUpdateBy: device.LastUpdatedBy()
                                            });
                                            $(this).dialog('close');
                                        }
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    id: "btnDialogOk",
                    text: "Ok",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ],
            title: device.UserName() + "'s " + device.DeviceName(),
            resizable: false,
            draggable: false,
            modal: true,
            width: "600px"
        }).dialog('open');
        $('#btnDialogOk').focus(); //highlights 'Ok' button
    }
    DialogBox.ShowDevice = ShowDevice;
    function AddNewManageDevice() {
        $('#manageDevicesDialog').html(ManageDevicesBuilder(null, true)).dialog({
            buttons: [
                {
                    text: "Cancel",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Save",
                    click: function () {
                        var parentDialog = this, save = true, GUIDVal = $('#txtGUID').val(), userNameVal = $('#selUserName option[value="' + $('#selUserName').val() + '"]').text(), deviceNameVal = $('#selDeviceName option[value="' + $('#selDeviceName').val() + '"]').text();
                        if (GUIDVal.length == 0) {
                            ShowDevicesErrorPopUp('Error', 'Must enter a GUID value.', [{
                                text: "Ok",
                                click: function () {
                                    $(this).dialog("close");
                                    $('#txtGUID').focus();
                                }
                            }]);
                            save = false;
                        }
                        $(viewModel.md.allDevices()).each(function (i, e) {
                            if (e.UserName() == userNameVal && e.DeviceName() == deviceNameVal) {
                                if (e.GUID() == GUIDVal) {
                                    //Error -- value already exists
                                    ShowDevicesErrorPopUp('Error', 'Record with that User/Device/GUID combo already exists.', [{
                                        text: "Ok",
                                        click: function () {
                                            $(this).dialog("close");
                                        }
                                    }]);
                                    save = false;
                                    return false;
                                }
                                ShowDevicesErrorPopUp('Warning', 'Record with that User/Device combo already exists. Are you sure you want to save?', [{
                                    text: "No",
                                    click: function () {
                                        save = false;
                                        $(this).dialog("close");
                                    }
                                }, {
                                    text: "Yes",
                                    click: function () {
                                        var newRec = new ManageDevicesModeling.ManageDevicesModel();
                                        newRec.UserName(userNameVal);
                                        newRec.DeviceName(deviceNameVal);
                                        newRec.GUID(GUIDVal);
                                        newRec.LastUpdatedBy("Nick");
                                        newRec.LastUpdatedDate(Formatting.TodaysDateTime());
                                        //Save this to Database
                                        JSONCalls.InsertManageDevices({
                                            ID: newRec.ID(),
                                            UserID: $('#selUserName').val(),
                                            DeviceID: $('#selDeviceName').val(),
                                            GUID: newRec.GUID(),
                                            LastUpdateBy: newRec.LastUpdatedBy()
                                        });
                                        viewModel.md.allDevices.push(newRec);
                                        $(this).dialog('close');
                                        $(parentDialog).dialog("close");
                                    }
                                }]);
                                save = false;
                                return;
                            }
                        });
                        if (save) {
                            var newRec = new ManageDevicesModeling.ManageDevicesModel();
                            newRec.UserName(userNameVal);
                            newRec.DeviceName(deviceNameVal);
                            newRec.GUID(GUIDVal);
                            newRec.LastUpdatedBy("Nick");
                            newRec.LastUpdatedDate(Formatting.TodaysDateTime());
                            //TODO: Need to Save this to Database
                            JSONCalls.InsertManageDevices({
                                ID: newRec.ID(),
                                UserID: $('#selUserName').val(),
                                DeviceID: $('#selDeviceName').val(),
                                GUID: newRec.GUID(),
                                LastUpdateBy: newRec.LastUpdatedBy()
                            });
                            viewModel.md.allDevices.push(newRec);
                            $(this).dialog('close');
                        }
                    }
                }
            ],
            title: 'Add New User-Device Pair',
            resizable: false,
            draggable: false,
            modal: true,
            width: "600px"
        }).dialog('open');
    }
    DialogBox.AddNewManageDevice = AddNewManageDevice;
    function DisableReferenceDataDialog(refData) {
        $('.disableReferenceDataDialog').html('<div>Are you sure you want to disable this record?</div>').dialog({
            buttons: [
                {
                    text: "No",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    id: 'btnDialogYes',
                    text: "Yes",
                    click: function () {
                        refData.Enabled(false);
                        $(this).dialog("close");
                    }
                }
            ],
            title: "Are you sure?",
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
        $('#btnDialogYes').focus(); //highlights 'Yes' button   
    }
    DialogBox.DisableReferenceDataDialog = DisableReferenceDataDialog;
    function RecordAlreadyExists(inputElement) {
        $('.disableReferenceDataDialog').html('<div>Record with that value already exists but it may be disabled. Contact an admin if it needs to be enabled.</div>').dialog({
            buttons: [
                {
                    id: 'btnDialogOk',
                    text: "Ok",
                    click: function () {
                        $(this).dialog("close");
                        $(inputElement).focus().select();
                    }
                }
            ],
            title: "Record already exists",
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
        $('#btnDialogOk').focus(); //highlights 'Ok' button 
    }
    DialogBox.RecordAlreadyExists = RecordAlreadyExists;
    function MustEnterValue(inputElement) {
        $('.disableReferenceDataDialog').html('<div>Must enter a value to add to the list.</div>').dialog({
            buttons: [
                {
                    id: 'btnDialogOk',
                    text: "Ok",
                    click: function () {
                        $(this).dialog("close");
                        $(inputElement).focus();
                    }
                }
            ],
            title: "Must Enter a Value",
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
        $('#btnDialogOk').focus(); //highlights 'Ok' button 
    }
    DialogBox.MustEnterValue = MustEnterValue;
    function ShowDevicesErrorPopUp(title, errText, buttons) {
        $('#deleteConfirmationDialog').html(errText).dialog({
            buttons: buttons,
            title: title,
            resizable: false,
            draggable: false,
            modal: true,
            width: "300px"
        }).dialog('open');
    }
    DialogBox.ShowDevicesErrorPopUp = ShowDevicesErrorPopUp;
    function WorkOrderBuilder(workOrder) {
        var html;
        html = '<table>';
        html = html + '<tr><td class="fieldLabel">Job:</td><td>' + workOrder.Job() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Submitted By:</td><td>' + workOrder.SubmittedBy() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Submitted Date:</td><td>' + workOrder.SubmittedDate() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Subject:</td><td>' + workOrder.Subject() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Description:</td><td>' + workOrder.Description() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Last Updated By:</td><td>' + workOrder.LastUpdatedBy() + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Last Updated Date:</td><td>' + workOrder.LastUpdatedDate() + '</td></tr>';
        html = html + '</table>';
        return html;
    }
    function ManageDevicesBuilder(device, edit) {
        if (edit === void 0) { edit = false; }
        var html;
        html = '<table>';
        html = html + '<tr><td class="fieldLabel">User:</td><td>' + (edit ? BuildDropdownAndSelectValue('selUserName', JSONCalls.GetAllUserNames(), (device == null ? null : device.UserName())) : device.UserName()) + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Device Name:</td><td>' + (edit ? BuildDropdownAndSelectValue('selDeviceName', JSONCalls.GetAllDevicesNames(), (device == null ? null : device.DeviceName())) : device.DeviceName()) + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Device GUID:</td><td>' + (edit ? '<input id="txtGUID" type="text" value="' + (device == null ? '' : device.GUID()) + '" />' : device.GUID()) + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Last Updated By:</td><td>' + (device == null ? '' : device.LastUpdatedBy()) + '</td></tr>';
        html = html + '<tr><td class="fieldLabel">Last Updated Date:</td><td>' + (device == null ? '' : device.LastUpdatedDate()) + '</td></tr>';
        html = html + '</table><div id="deleteConfirmationDialog"></div>';
        return html;
    }
    function BuildDropdownAndSelectValue(selectID, dataJSON, selectionValue) {
        var html = '<select id="' + selectID + '">';
        $($.parseJSON(dataJSON)).each(function (i, e) {
            html = html + '<option value="' + e.ID + '" ' + (selectionValue == e.Value ? 'selected="selected"' : '') + '>' + e.Value + '</option>';
        });
        return html;
    }
})(DialogBox || (DialogBox = {}));
//# sourceMappingURL=DialogBox.js.map