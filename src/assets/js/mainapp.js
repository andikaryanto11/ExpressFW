function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

$('input').on('focus', function () {
  var classes = this.className.split(" ");
  var input = this;
  $.each(classes, function (index, value) {
    if (value == "clearable") {
      var id = input.id;
      $("#" + id).val("");
      $("#M_" + ucFirst(id) + "_Id").val("");
      $("#T_" + ucFirst(id) + "_Id").val("");
    }
  });
});

// $('.selectpicker').selectpicker({
//   style: 'btn-primary'
// });

// $('.time').datetimepicker({
//   icons: {
//     time: "fa fa-clock-o",
//     date: "fa fa-calendar",
//     up: "fa fa-arrow-up",
//     down: "fa fa-arrow-down",
//     previous: 'fa fa-angle-double-left',
//     next: 'fa fa-angle-double-right',
//   },
//   format: 'HH:mm'
// });

// $('.datetimepicker').datetimepicker({
//   icons: {
//     time: "fas fa-clock",
//     date: "fa fa-calendar",
//     up: "fa fa-arrow-up",
//     down: "fa fa-arrow-down",
//     previous: 'fa fa-angle-left',
//     next: 'fa fa-angle-right',
//   },
//   format: 'DD-MM-YYYY HH:mm'
// });

// $('.date').datetimepicker({
//   icons: {
//     time: "fas fa-clock",
//     date: "fa fa-calendar",
//     up: "fa fa-arrow-up",
//     down: "fa fa-arrow-down",
//     previous: 'fa fa-angle-left',
//     next: 'fa fa-angle-right',
//   },
//   format: 'DD-MM-YYYY'
// });

// $('.datepicker').datepicker({
//   language: 'id',
//   format: "dd-mm-yyyy"
// });


// $('.popover-dismiss').popover({
//   trigger: 'focus'
// })


// $('.yearperiod').datepicker({
//   format: "yyyy",
//   viewMode: "years",
//   minViewMode: "years"
// });

// $(".sortable").sortable({});

//alert
function setNotification(message, title, position = "bottom", align = "right") {

  if (title == 1) {
    var titlestr = "WARNING";
    var type = "warning";
  } else if (title == 2) {
    var titlestr = "SUCCESS";
    var type = "success";
  } else if (title == 3) {
    var titlestr = "DANGER";
    var type = "danger";
  } else {
    var titlestr = "INFO";
    var type = "info";
  }

  $.notify({
    title: titlestr + " : ",
    message: message,
  }, {
    element: 'body',
    position: null,
    type: type,
    allow_dismiss: false,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
      from: position,
      align: align
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: 'pause',
    animate: {
      enter: 'animated fadeInRight',
      exit: 'animated fadeOutRight'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"> <i class="icon-close"></i></button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title"><b>{1}</b></span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
    // template : '<div class="notification-toast-{0}">'+
    //   '<div class="row mx-0">' +
    //     '<div class="col-2 py-3"><i class="fa fa-check text-light ml-2 d-inline-block"></i></div>'+
    //     '<div class="col-10 pt-3">{2}</div>'+
    //   '</div>'+
    // '</div>'
  });
}

function deleteData(name, callback) {
  bootbox.confirm({
    message: "Hapus " + name + " ?",
    buttons: {
      cancel: {
        label: "CANCEL"
      },
      confirm: {
        label: "CONFIRM"
      }
    },
    callback: function (result) {
      callback(result);
    }
  });
}

function makeAlert(message, size = "") {
  bootbox.alert({
    message: message,
    backdrop: true,
    size: size
  });
}

//masking
// $('.transnumberformat').inputmask({
//   mask: 'aaa/{YYYY}{MM}/9'
// });

// $('.itemdimention').inputmask({
//   mask: '99 x 99 x 99'
// });



// $('.money').mask('000.000.000.000.000,00', {
//   reverse: true
// });
// $('.money2').mask("#.##0,00", {
//   reverse: true
// });
// $('.percent').mask('##0,00 %', {
//   reverse: true
// });
// // customfile input
// $(".custom-file-input").on("change", function () {
//   var fileName = $(this).val().split("\\").pop();
//   $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
// });

//datatables
function loadIndexDataTable(table, sourceUrl, searchCaption, deleteUrl = null, columns = [], callback = null, baseUrl = null, canSearch = true) {
  // var length = 10;
  var indexTable = null;
  indexTable = $("#" + table).DataTable({
   
    "lengthChange": false,
    scrollX: true,
    scrollCollapse: true,
    // paging: false,
    fixedColumns: true,
    searching : canSearch,
    destroy: true,
    "pagingType": "full_numbers",
    "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
    "order": [[2, "desc"]],
    // iDisplayLength : length,
    responsive: true,
    language: {
      search: "_INPUT_",
      "search": searchCaption,
      searchPlaceholder : "search keyword"
    },
    "columnDefs": [
      {
        targets: 'disabled-sorting',
        orderable: false
      },
      {
        "targets": [0],
        "visible": false,
        "searchable": false,
        width: '20%',
      },
      {
        "targets": columns.length - 1,
        "className": "dt-right",
      }
    ],
    columns: columns,
    "processing": true,
    "serverSide": true,
    ajax: {
      url: sourceUrl, 
      dataSrc: 'data',
      type: "POST",
      
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
    },
    stateSave: true,
    
  });
  // Delete a record


  if (callback != null) {
    callback(indexTable);
  }
}

var modalTable = null;
function loadModalInputDataTable(table, modalId, sourceUrl, searchCaption, inputId, inputName) {
  if (modalTable != null) {
    modalTable.destroy();
    modalTable = null;
  }

  modalTable = $("#" + table).DataTable({
    "pagingType": "full_numbers",
    "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
    responsive: true,
    language: {
      search: "_INPUT_",
      "search": searchCaption
    },
    "columnDefs": [
      {
        targets: 'disabled-sorting',
        orderable: false
      },
      {
        "targets": [0],
        "visible": false,
        "searchable": false
      }
    ],
    "processing": true,
    "serverSide": true,
    ajax: {
      url: sourceUrl,
      dataSrc: 'data',
      type: "POST",
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
    },
    stateSave: true,

  });


  // console.log(modalTable);
  // Edit record
  modalTable.on('click', '.rowdetail', function () {
    $tr = $(this).closest('tr');

    var data = modalTable.row($tr).data();
    var id = $tr.attr('id');
    // console.log(data);
    $("#" + inputId).val(data[0]);
    $("#" + inputName).val(data[1]);
    $('#' + modalId).modal('hide');
    // modalTable.destroy();
  });
}

function loadModalSelectDataTable(table, modalId, sourceUrl, searchCaption, callback) {
  var modalTable = $("#" + table).DataTable({
    "pagingType": "full_numbers",
    "lengthMenu": [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
    responsive: true,
    language: {
      search: "_INPUT_",
      "search": searchCaption + " : ",
    },
    "columnDefs": [
      {
        className: 'select-checkbox',
        targets: 'disabled-sorting',
        orderable: false
      },
      {
        "targets": [0],
        "visible": false,
        "searchable": false,
      }
    ],
    select: {
      style: 'multi'
    },
    "processing": true,
    "serverSide": true,
    ajax: {
      url: sourceUrl,
      dataSrc: 'data',
      type: "POST",
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
    },
    stateSave: true
  });
  // console.log(modalTable);
  // Edit record
  modalTable.on('click', '.rowdetail', function () {
    $tr = $(this).closest('tr');

    var data = modalTable.row($tr).data();
    var id = $tr.attr('id');

  });

  callback($('#' + modalId), modalTable);
}

function getSelectedModalData() {
  return selectedDataSelect;
}