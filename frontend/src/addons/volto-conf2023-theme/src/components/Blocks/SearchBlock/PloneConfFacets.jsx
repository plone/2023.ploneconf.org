import { Button, Grid, Segment } from 'semantic-ui-react';
import { Facets } from '@plone/volto/components/manage/Blocks/Search/components';
import { defineMessages, useIntl } from 'react-intl';
import FiltersModal from './FiltersModal';
import SearchInput from '@plone/volto/components/manage/Blocks/Search/components/SearchInput';
import React from 'react';
import { flushSync } from 'react-dom';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const FacetWrapper = ({ children }) => (
  <Segment basic className="facet">
    {children}
  </Segment>
);

function setFacetsHandler(setFacets, onTriggerSearch, searchedText) {
  return (f) => {
    flushSync(() => {
      setFacets(f);
      onTriggerSearch(searchedText || '', f);
    });
  };
}

const PloneConfFacets = (props) => {
  const {
    children,
    data,
    facets,
    setFacets,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    isEditMode,
    querystring = {},
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();
  if (querystring?.sortable_indexes?.effective?.title) {
    querystring.sortable_indexes.effective.title = 'Publication date';
  }
  if (querystring?.sortable_indexes?.sortable_title?.title) {
    querystring.sortable_indexes.sortable_title.title = 'Sort by title';
  }
  if (querystring?.sortable_indexes?.modified?.title) {
    querystring.sortable_indexes.modified.title = 'Last edited';
  }
  return (
    <Grid className="searchBlock-facets right-column-facets" stackable>
      {data?.headline && (
        <Grid.Row>
          <Grid.Column>
            {data.headline && <h2 className="headline">{data.headline}</h2>}
          </Grid.Column>
        </Grid.Row>
      )}

      <div className="filter-search-wrapper">
        {(Object.keys(data).includes('showSearchInput')
          ? data.showSearchInput
          : true) && (
          <div className="search-wrapper">
            <SearchInput {...props} isLive={isLive} />
            {data.showSearchButton && (
              <Button
                primary
                onClick={() => onTriggerSearch(searchText)}
                aria-label={
                  data.searchButtonLabel ||
                  intl.formatMessage(messages.searchButtonText)
                }
              >
                <span className="icon-zoom"></span>
              </Button>
            )}
          </div>
        )}
        <div className="filters">
          <div className="search-results-count-sort search-filters">
            {data.facets?.length && (
              <FiltersModal
                data={data}
                facets={facets}
                setFacets={setFacetsHandler(
                  setFacets,
                  onTriggerSearch,
                  searchedText,
                )}
              >
                <div id="right-modal-facets" className="facets">
                  <Facets
                    querystring={querystring}
                    data={data}
                    facets={facets}
                    isEditMode={isEditMode}
                    setFacets={setFacetsHandler(
                      setFacets,
                      onTriggerSearch,
                      searchedText,
                    )}
                    facetWrapper={FacetWrapper}
                  />
                </div>
              </FiltersModal>
            )}
          </div>
        </div>
      </div>
      <Grid.Row>
        <Grid.Column mobile={12} tablet={12} computer={12}>
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PloneConfFacets;
