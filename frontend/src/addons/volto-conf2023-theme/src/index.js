import CountdownEdit from './components/Blocks/Countdown/Edit';
import CountdownView from './components/Blocks/Countdown/View';
import CTAEdit from './components/Blocks/CTA/Edit';
import CTAView from './components/Blocks/CTA/View';
import FixedBackgroundEdit from './components/Blocks/FixedBackground/Edit';
import FixedBackgroundView from './components/Blocks/FixedBackground/View';
import HeroImageEdit from './components/Blocks/HeroImage/Edit';
import HeroImageView from './components/Blocks/HeroImage/View';
import NucliaEdit from './components/Blocks/Nuclia/Edit';
import NucliaView from './components/Blocks/Nuclia/View';
import PayPalEdit from './components/Blocks/PayPal/Edit';
import PayPalView from './components/Blocks/PayPal/View';
import ScheduleEdit from './components/Blocks/Schedule/Edit';
import ScheduleView from './components/Blocks/Schedule/View';
import SponsorsEdit from './components/Blocks/Sponsors/Edit';
import SponsorsView from './components/Blocks/Sponsors/View';
import VenueEdit from './components/Blocks/Venue/Edit';
import VenueView from './components/Blocks/Venue/View';
import PloneConfFacets from './components/Blocks/SearchBlock/PloneConfFacets';
import {
  NewsListingBody,
  PersonsListingBody,
  PersonsSimpleListingBody,
  TalksListingBody,
  HomeCheckboxSchema,
} from './components/Blocks/Listing';

// import TeaserPersonBody from './components/Blocks/Teaser/TeaserPersonBody';
import {
  Teaser2ColumnsGreyFeatured,
  Teaser2ColumnsFeatured,
  ColoredTeaserCard,
  TeaserMainFeatured,
  TeaserImageCard,
  HomeFeaturedSchemaEnhancer,
  CardSchemaEnhancer,
  MainFeaturedSchemaEnhancer,
  ImagedCardSchemaEnhancer,
} from './components/Blocks/Teaser';
import TeaserBlockDefaultBody from '@plone/volto/components/manage/Blocks/Teaser/DefaultBody';

import calendarSVG from '@plone/volto/icons/calendar.svg';
import heroSVG from '@plone/volto/icons/hero.svg';
import images from '@plone/volto/icons/images.svg';
import listBulletSVG from '@plone/volto/icons/list-bullet.svg';
import sliderSVG from '@plone/volto/icons/slider.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';

import Keynote from './components/Views/Keynote';
import Person from './components/Views/Person';
import Sponsor from './components/Views/Sponsor';
import Talk from './components/Views/Talk';
import Training from './components/Views/Training';
import NewsItemView from './customizations/volto/components/theme/View/NewsItemView';

import reducers from './reducers';

import { BlockButton } from '@plone/volto-slate/editor/ui';
import { H2Styled } from './editor/plugins/H2Styled/constants';
import H2StyledElement from './editor/plugins/H2Styled/H2StyledElement';
import tooltipSVG from '@plone/volto/icons/help.svg';

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    matomoSiteId: '10',
    matomoUrlBase: 'https://stats.ploneconf.org/',
    socialNetworks: [
      {
        id: 'twitter',
        url: 'https://twitter.com/ploneconf',
      },
      {
        id: 'facebook',
        url: 'https://www.facebook.com/PloneConference',
      },
      {
        id: 'youtube',
        url: 'http://youtube.com/c/PloneCMS',
      },
    ],
    pictureOptions: {
      grid: [
        { media: '(min-width: 768px)', image: 'teaser' },
        { media: '(max-width: 767px)', image: 'large' },
      ],
      mainimage: [
        { media: '(min-width: 768px)', image: 'huge' },
        { media: '(max-width: 767px)', image: 'large' },
      ],
      teaser2columns: [
        { media: '(min-width: 768px)', image: 'larger' },
        { media: '(max-width: 767px)', image: 'large' },
      ],
      newsitem: [
        { media: '(min-width: 1200px)', image: 'larger' },
        { media: '(min-width: 992px) and (max-width: 1199px)', image: 'large' },
        { media: '(max-width: 991px)', image: 'teaser' },
      ],
    },
  };

  config.views.contentTypesViews.Person = Person;
  config.views.contentTypesViews.Talk = Talk;
  config.views.contentTypesViews.Training = Training;
  config.views.contentTypesViews.Keynote = Keynote;
  config.views.contentTypesViews.Sponsor = Sponsor;
  config.views.contentTypesViews['News Item'] = NewsItemView;

  // Needed for deleting title from block
  config.blocks.requiredBlocks = [];

  const teaserVariations = [
    {
      id: 'default',
      isDefault: true,
      title: 'Default',
      template: TeaserBlockDefaultBody,
    },
    {
      id: 'homeFeatured',
      title: '2 columns Grey bg',
      template: Teaser2ColumnsGreyFeatured,
      schemaEnhancer: HomeFeaturedSchemaEnhancer,
    },
    {
      id: '2columns',
      title: '2 columns',
      template: Teaser2ColumnsFeatured,
      schemaEnhancer: HomeFeaturedSchemaEnhancer,
    },
    {
      id: 'teaserCard',
      title: 'Colored Card',
      template: ColoredTeaserCard,
      schemaEnhancer: CardSchemaEnhancer,
    },
    {
      id: 'mainFeatured',
      title: 'Main Featured',
      template: TeaserMainFeatured,
      schemaEnhancer: MainFeaturedSchemaEnhancer,
    },
    {
      id: 'imagedCard',
      title: 'Imaged Card',
      template: TeaserImageCard,
      schemaEnhancer: ImagedCardSchemaEnhancer,
    },
  ];

  config.blocks.blocksConfig.teaser.variations = teaserVariations;

  config.blocks.blocksConfig.__grid.blocksConfig.teaser.variations = teaserVariations;

  config.blocks.blocksConfig.search.variations = [
    ...config.blocks.blocksConfig.search.variations,
    {
      id: 'PloneConfFacets',
      title: 'Facets PloneConf search',
      view: PloneConfFacets,
      isDefault: false,
    },
  ];
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'persons',
      title: 'Persons',
      template: PersonsListingBody,
      schemaEnhancer: HomeCheckboxSchema,
    },
    {
      id: 'personsSimple',
      title: 'Persons Simple',
      template: PersonsSimpleListingBody,
    },
    {
      id: 'talks',
      title: 'Talks',
      template: TalksListingBody,
      fullobjects: true,
    },
    {
      id: 'news',
      title: 'News',
      template: NewsListingBody,
      schemaEnhancer: HomeCheckboxSchema,
    },
  ];

  config.addonReducers = { ...config.addonReducers, ...reducers };

  config.blocks.blocksConfig.cta = {
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
  };
  config.blocks.blocksConfig.sponsorsList = {
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
  };
  config.blocks.blocksConfig.paypalBlock = {
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
  };
  config.blocks.blocksConfig.fixedBackground = {
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
  };
  config.blocks.blocksConfig.heroImage = {
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
  };
  config.blocks.blocksConfig.countdown = {
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
  };
  config.blocks.blocksConfig.venue = {
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
  };
  config.blocks.blocksConfig.schedule = {
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
  };
  config.blocks.blocksConfig.nuclia = {
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
  };
  config.settings.slate.buttons['H2Styled'] = (props) => (
    <BlockButton
      format="H2Styled"
      icon={tooltipSVG}
      title="H2Styled"
      {...props}
    />
  );

  config.settings.slate.elements['H2Styled'] = H2StyledElement;
  config.settings.slate.toolbarButtons = [
    ...(config.settings.slate.toolbarButtons || []),
    H2Styled,
  ];
  config.settings.slate.topLevelTargetElements.push('H2Styled');
  config.settings.slate.expandedToolbarButtons = [
    ...(config.settings.slate.expandedToolbarButtons || []),
    H2Styled,
  ];

  return config;
};

export default applyConfig;
