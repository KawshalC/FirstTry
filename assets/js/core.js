jQuery(function ($) {

    var startAnimation = function ($panelContainer) {
        $panelContainer.addClass('animating');
    };

    var updatePanelNav = function ($panelNav, $panelContainer, $panelToSlideIn, numPanels) {
        var idx = $panelToSlideIn.index('#' + $panelContainer.attr('id') + ' > .tabContainer');
        if (idx === 0) {
            $panelNav.find('a[href="#prev"]').addClass('inactive');
        } else {
            $panelNav.find('a[href="#prev"]').removeClass('inactive');
        }

        if (idx == numPanels - 1) {
            $panelNav.find('a[href="#next"]').addClass('inactive');
        } else {
            $panelNav.find('a[href="#next"]').removeClass('inactive');
        }
        $panelNav.find('.nav-item').removeClass('active');
        $($panelNav.find('.nav-item')[idx]).addClass('active');
    };

    var stopAnimation = function ($panelContainer, $panels, $panelToSlideIn) {
        var extraClass = $panelContainer.data('extraclass') || '';
        $panelToSlideIn.removeClass().addClass('tabContainer current ' + extraClass);
        $panels.filter(':not(#' + $panelToSlideIn.attr('id') + ')').removeClass().addClass('tabContainer ' + extraClass);
        $panelContainer.removeClass('animating');
    };

    var setExitPanel = function ($panelToSlideOut, exitAnimation) {
        $panelToSlideOut.addClass('exit ' + exitAnimation).removeClass('current');
    };

    var setEnterPanel = function ($panelToSlideIn, enterAnimation) {
        $panelToSlideIn.addClass('enter ' + enterAnimation);
    };

    $('.navbar-nav').each(function (i) {
        var $panelNav = $(this),
            $panelNavItems = $panelNav.find('.nav-link'),
            $panelContainer = $('#' + $panelNav.data('panelwrapper')),
            $panels = $panelContainer.find('> .tabContainer'),
            numPanels = $panels.length,
            animationDuration = ($panelContainer.data('sequential') == 'yes') ? 600 : 300;

        if (numPanels > 1) {
            $panelNav.find('a[href="#next"]').removeClass('inactive');
        }
        $panelNavItems.on('click', function (e) {
            e.preventDefault();
            var $panelToSlideIn, $panelToSlideOut, enterAnimation, exitAnimation;
            if ($panelContainer.is('.animating')) return false;
            $panelToSlideOut = $panels.filter('.current');
            if ($(this).attr('href') == '#next') {
                $panelToSlideIn = $panels.filter('.current').next('.tabContainer');
            } else if ($(this).attr('href') == '#prev') {
                $panelToSlideIn = $panels.filter('.current').prev('.tabContainer');
            } else {
                $panelToSlideIn = $($(this).attr('href'));
            }


            if ($panelToSlideIn.length == 0) return;
            if ($panelToSlideOut.attr('id') == $panelToSlideIn.attr('id')) return;

            enterAnimation = $panelToSlideIn.data('enter') || $panelContainer.data('enter');
            exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');

            setExitPanel($panelToSlideOut, exitAnimation);
            setEnterPanel($panelToSlideIn, enterAnimation);

            setTimeout(function () {
                startAnimation($panelContainer);
            }, 0);

            updatePanelNav($panelNav, $panelContainer, $panelToSlideIn, numPanels);
            setTimeout(function () {
                stopAnimation($panelContainer, $panels, $panelToSlideIn);
            }, animationDuration);
        });
    });
});