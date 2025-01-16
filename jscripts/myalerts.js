(function ($, window, document) {
  "use strict";

  $(document).ready(function () {
    //////////////////////////////////////////////////
    // 1) POLL EVERY 30 SECONDS FOR UNREAD ALERTS+CONVS
    //////////////////////////////////////////////////
    setInterval(function () {
      $.get("xmlhttp.php?action=getNumUnreadAlertsandconvs", function (data) {
        let json;
        try {
          json = $.parseJSON(data);
        } catch (e) {
          console.error(
            "JSON parse error from getNumUnreadAlertsandconvs:",
            e,
            data
          );
          return;
        }
        if (json && json.status === "done") {
          // Update alerts badge
          if (json.newalerts > 0) {
            $("#alertnumnx")
              .removeClass()
              .addClass("pmnumber-box-new")
              .text(json.newalerts);
          } else {
            $("#alertnumnx")
              .removeClass()
              .addClass("pmnumber-box")
              .text(json.newalerts);
          }
          // Update conversations badge
          if (json.newconvs > 0) {
            $("#convnumnx")
              .removeClass()
              .addClass("pmnumber-box-new")
              .text(json.newconvs);
          } else {
            $("#convnumnx")
              .removeClass()
              .addClass("pmnumber-box")
              .text(json.newconvs);
          }
        } else {
          console.warn(
            "Unexpected JSON structure from getNumUnreadAlertsandconvs:",
            json
          );
        }
      }).fail(function (xhr, status, error) {
        console.error("AJAX error getNumUnreadAlertsandconvs:", status, error);
      });
    }, 30000);

    //////////////////////////////////////////////
    // 2) ALERTS DROPDOWN: LOAD + TOGGLE
    //////////////////////////////////////////////
    $("#myalerts").on("click", function (e) {
      e.preventDefault();

      // Close other box
      $("#myconvsbx").hide();

      // Load alerts table
      const $rows = $("#myalertsbx table.dropdown-rows");
      $rows.html("<tr><td>Loading Alerts…</td></tr>");
      $rows.load(
        "alerts.php?action=view_myalertpop",
        function (response, status, xhr) {
          if (status === "error") {
            console.error(
              "Error loading alerts pop:",
              xhr.status,
              xhr.statusText
            );
            $rows.html("<tr><td>Error loading alerts</td></tr>");
          } else {
            if (!$.trim(response)) {
              // If empty, fallback
              $rows.html("<tr><td>No alerts found</td></tr>");
            }
          }
        }
      );

      // Toggle visibility
      $("#myalertsbx").toggle("fast");
    });

    //////////////////////////////////////////////
    // 3) CONVERSATIONS DROPDOWN: LOAD + TOGGLE
    //////////////////////////////////////////////
    $("#myconves").on("click", function (e) {
      e.preventDefault();

      // Close other box
      $("#myalertsbx").hide();

      // Load conv table
      const $rows = $("#myconvsbx table.dropdown-rows");
      $rows.html("<tr><td>Loading Conversations…</td></tr>");
      $rows.load(
        "converse.php?action=view_myconvpop",
        function (response, status, xhr) {
          if (status === "error") {
            console.error(
              "Error loading conv pop:",
              xhr.status,
              xhr.statusText
            );
            $rows.html("<tr><td>Error loading conversations</td></tr>");
          } else {
            if (!$.trim(response)) {
              $rows.html("<tr><td>No conversations found</td></tr>");
            }
          }
        }
      );

      // Toggle visibility
      $("#myconvsbx").toggle("fast");
    });

    //////////////////////////////////////////////
    // 4) CLICK OUTSIDE TO CLOSE BOTH BOXES
    //////////////////////////////////////////////
    $(document).on("click", function (e) {
      const $target = $(e.target);
      // If the click is NOT on #myalerts or #myalertsbx
      // AND not on #myconves or #myconvsbx => close them
      if (
        !$target.closest("#myalerts, #myalertsbx").length &&
        !$target.closest("#myconves, #myconvsbx").length
      ) {
        $("#myalertsbx").hide("fast");
        $("#myconvsbx").hide("fast");
      }
    });

    //////////////////////////////////////////////
    // 5) ESC KEY TO CLOSE BOTH (OPTIONAL)
    //////////////////////////////////////////////
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        $("#myalertsbx").hide("fast");
        $("#myconvsbx").hide("fast");
      }
    });
  });
})(jQuery, window, document);
