import CTAEdit from './CTA/Edit';
import CTAView from './CTA/View';

import SponsorsEdit from './Sponsors/Edit';
import SponsorsView from './Sponsors/View';

import PayPalEdit from './PayPal/Edit';
import PayPalView from './PayPal/View';

import FixedBackgroundEdit from './FixedBackground/Edit';
import FixedBackgroundView from './FixedBackground/View';

import CountdownEdit from './Countdown/Edit';
import CountdownView from './Countdown/View';

import HeroImageEdit from './HeroImage/Edit';
import HeroImageView from './HeroImage/View';

import VenueEdit from './Venue/Edit';
import VenueView from './Venue/View';

import ScheduleEdit from './Schedule/Edit';
import ScheduleView from './Schedule/View';

import NucliaEdit from './Nuclia/Edit';
import NucliaView from './Nuclia/View';

import sliderSVG from '@plone/volto/icons/slider.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import images from '@plone/volto/icons/images.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';

export const customBlocks = {
  cta: {
    id: 'cta',
    title: 'CTA',
    icon: sliderSVG,
    group: 'common',
    view: CTAView,
    edit: CTAEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  sponsorsList: {
    id: 'sponsorsList',
    title: 'Sponsors',
    icon: listBulletSVG,
    group: 'text',
    view: SponsorsEdit,
    edit: SponsorsView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  },
  paypalBlock: {
    id: 'paypalBlock',
    title: 'PayPal',
    icon: listBulletSVG,
    group: 'text',
    view: PayPalView,
    edit: PayPalEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 0,
    security: {
      addPermission: [],
      view: [],
    },
  },
  fixedBackground: {
    id: 'fixedBackground',
    title: 'Fixed Background',
    icon: images,
    group: 'common',
    view: FixedBackgroundView,
    edit: FixedBackgroundEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  heroImage: {
    id: 'heroImage',
    title: 'Hero Image Advanced',
    icon: heroSVG,
    group: 'common',
    view: HeroImageView,
    edit: HeroImageEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  countdown: {
    id: 'countdown',
    title: 'Countdown',
    icon: heroSVG,
    group: 'common',
    view: CountdownView,
    edit: CountdownEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  venue: {
    id: 'venue',
    title: 'Venue',
    icon: heroSVG,
    group: 'common',
    view: VenueView,
    edit: VenueEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  schedule: {
    id: 'schedule',
    title: 'Schedule',
    icon: calendarSVG,
    group: 'common',
    view: ScheduleView,
    edit: ScheduleEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
  nuclia: {
    id: 'nuclia',
    title: 'Nuclia',
    icon: zoomSVG,
    group: 'common',
    view: NucliaView,
    edit: NucliaEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};
