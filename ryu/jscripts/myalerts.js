// (function ($, window, document, my_post_key, undefined) {
//   this.MybbStuff = this.MybbStuff || {};

//   this.MybbStuff.MyAlerts = (function MyAlertsModule(window, $) {
//     var module = function MyAlerts() {
//       var unreadAlertsProxy = $.proxy(this.getUnreadAlerts, this),
//         deleteAlertProxy = $.proxy(this.deleteAlert, this),
//         markReadAlertProxy = $.proxy(this.markReadAlert, this),
//         bodySelector = $("body");

//       bodySelector.on("click", "#getUnreadAlerts", unreadAlertsProxy);
//       bodySelector.on("click", ".deleteAlertButton", deleteAlertProxy);
//       bodySelector.on("click", ".markReadAlertButton", markReadAlertProxy);

//       if (
//         typeof myalerts_autorefresh !== "undefined" &&
//         myalerts_autorefresh > 0
//       ) {
//         window.setInterval(function () {
//           $.get("xmlhttp.php?action=getNewAlerts", function (data) {
//             $("#latestAlertsListing").prepend(data);
//           });
//         }, myalerts_autorefresh * 1000);
//       }

//       if (typeof unreadAlerts !== "undefined" && unreadAlerts > 0) {
//         document.title = document.title + " (" + unreadAlerts + ")";
//       }
//     };

//     module.prototype.getUnreadAlerts = function getUnreadAlerts(event) {
//       event.preventDefault();
//       $.get("xmlhttp.php?action=getNewAlerts", function (data) {
//         $("#latestAlertsListing").prepend(data);
//       });
//     };

//     module.prototype.deleteAlert = function deleteAlert(event) {
//       event.preventDefault();

//       var deleteButton = $(event.currentTarget),
//         alertId = deleteButton.attr("id").substring(13);

//       $.getJSON(
//         "xmlhttp.php?action=myalerts_delete",
//         {
//           accessMethod: "js",
//           id: alertId,
//           my_post_key: my_post_key,
//         },
//         function (data) {
//           if (data.success) {
//             deleteButton.parents("tr").get(0).remove();
//           } else {
//             for (var i = 0; i < data.errors.length; ++i) {
//               console.log(data.errors[i]);
//             }
//             alert(data.errors[0]);
//           }
//         }
//       );

//       return false;
//     };

//     module.prototype.markReadAlert = function markReadAlert(event) {
//       event.preventDefault();

//       var button = $(event.currentTarget),
//         alertId = button.attr("id").substring(15);

//       $.getJSON(
//         "xmlhttp.php?action=myalerts_mark_read",
//         {
//           accessMethod: "js",
//           id: alertId,
//           my_post_key: my_post_key,
//         },
//         function (data) {
//           if (data.success) {
//             $(button.parents("tr").get(0))
//               .removeClass("alert--unread")
//               .addClass("alert--read");
//           } else {
//             for (var i = 0; i < data.errors.length; ++i) {
//               console.log(data.errors[i]);
//             }
//             alert(data.errors[0]);
//           }
//         }
//       );

//       return false;
//     };

//     return module;
//   })(window, jQuery);
// })(jQuery, window, document, my_post_key);
// //***************************** MYPGR O6 ****************************//
// $(document).ready(function () {
//   // Poll every 30 seconds for unread alerts and convs
//   setInterval(function () {
//     $.get("xmlhttp.php?action=getNumUnreadAlertsandconvs", function (data) {
//       var json = $.parseJSON(data);
//       if (typeof json == "object") {
//         if (json.hasOwnProperty("status")) {
//           if (json.status == "done") {
//             if (json.newalerts > 0) {
//               $("#alertnumnx").removeClass().addClass("pmnumber-box-new");
//             } else {
//               $("#alertnumnx").removeClass().addClass("pmnumber-box");
//             }
//             if (json.newconvs > 0) {
//               $("#convnumnx").removeClass().addClass("pmnumber-box-new");
//             } else {
//               $("#convnumnx").removeClass().addClass("pmnumber-box");
//             }

//             $("#alertnumnx").text(json.newalerts);
//             $("#convnumnx").text(json.newconvs);
//           }
//         }
//       }
//     });
//   }, 30000);

//   // Click handler for Alerts Icon
//   $("#myalerts").click(function (e) {
//     e.preventDefault();
//     e.stopPropagation(); // Prevents the click from propagating to the global handler

//     // Load alerts content via AJAX
//     $("#myalertsbx table.myapb-rows").load(
//       "alerts.php?action=view_myalertpop",
//       function (response, status, xhr) {
//         if (status === "error") {
//           console.error(
//             "Error loading alerts pop:",
//             xhr.status,
//             xhr.statusText
//           );
//           $("#myalertsbx table.myapb-rows").html(
//             "<tr><td>Error loading alerts.</td></tr>"
//           );
//         } else if (!$.trim(response)) {
//           $("#myalertsbx table.myapb-rows").html(
//             "<tr><td>No alerts found.</td></tr>"
//           );
//         }
//       }
//     );

//     // Toggle visibility of alerts dropdown
//     if ($("#myalertsbx").css("display") == "none") {
//       $("#myalertsbx").show("fast");
//       $("#myconvsbx").hide("fast"); // Hide conversations dropdown if open
//     } else {
//       $("#myalertsbx").hide("fast");
//     }
//   });

//   // Click handler for Conversations Icon
//   $("#myconves").click(function (e) {
//     e.preventDefault();
//     e.stopPropagation(); // Prevents the click from propagating to the global handler

//     // Load conversations content via AJAX
//     $("#myconvsbx table.myapb-rows").load(
//       "converse.php?action=view_myconvpop",
//       function (response, status, xhr) {
//         if (status === "error") {
//           console.error(
//             "Error loading conversations pop:",
//             xhr.status,
//             xhr.statusText
//           );
//           $("#myconvsbx table.myapb-rows").html(
//             "<tr><td>Error loading conversations.</td></tr>"
//           );
//         } else if (!$.trim(response)) {
//           $("#myconvsbx table.myapb-rows").html(
//             "<tr><td>No conversations found.</td></tr>"
//           );
//         }
//       }
//     );

//     // Toggle visibility of conversations dropdown
//     if ($("#myconvsbx").css("display") == "none") {
//       $("#myconvsbx").show("fast");
//       $("#myalertsbx").hide("fast"); // Hide alerts dropdown if open
//     } else {
//       $("#myconvsbx").hide("fast");
//     }
//   });

//   // Click outside handler to close both dropdowns
//   $(document).on("click", function (e) {
//     var $target = $(e.target);
//     // Check if the click is outside the alerts and conversations dropdowns and their icons
//     if (
//       !$target.closest("#myalerts, #myalertsbx, #myconves, #myconvsbx").length
//     ) {
//       $("#myalertsbx").hide("fast");
//       $("#myconvsbx").hide("fast");
//     }
//   });

//   // Optional: Hide dropdowns on ESC key press
//   $(document).on("keydown", function (e) {
//     if (e.key === "Escape") {
//       $("#myalertsbx").hide("fast");
//       $("#myconvsbx").hide("fast");
//     }
//   });
// });
// //***************************** MYPGR O6 ****************************//
