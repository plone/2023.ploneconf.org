import React from 'react';
import { Modal, TransitionablePortal } from 'semantic-ui-react';
import { Button, Icon } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

function FiltersModal(props) {
  let { children, size = 'fullscreen', data, facets = {} } = props;
  const [open, setOpen] = React.useState(false);
  const definedFacets = data.facets || [];

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  const totalFilters = definedFacets.filter(
    ({ field }) =>
      field &&
      Object.keys(facets).includes(field.value) &&
      !isEmpty(facets[field.value]),
  ).length;
  const totalfiltertext = totalFilters ? ' ' + totalFilters : '';
  return (
    <>
      <Button className="ui button secondary" onClick={openModal}>
        <Icon name="filter"></Icon>
        {data.facetsTitle + totalfiltertext}
      </Button>
      <TransitionablePortal
        open={open}
        transition={{ animation: 'fade left', duration: 1000 }}
      >
        <Modal
          open={true}
          size={size}
          id="fullscreen-filter-modal"
          onClose={() => closeModal()}
        >
          <div className="modal modal-filters" id="filters_modal">
            <div className="modal-filters-background">
              <div className="modal-filters-container">
                <div className="modal-filters-header">
                  <div className="modal-filters-title">
                    <h3 className="modal-title">{data.facetsTitle}</h3>
                  </div>
                  <div className="modal-filters-right">
                    <div className="modal-close modal-filters-close">
                      <span
                        className="icon-close"
                        aria-label="Close"
                        onClick={() => closeModal()}
                        onKeyDown={() => closeModal()}
                        tabIndex="0"
                        role="button"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="modal-filters-body">
                  <div className="modal-filters-dropdown">
                    <div className="modal-filters-dropdown-container">
                      {children}
                    </div>
                  </div>
                  <div className="apply-filters-button">
                    <button
                      className="ui button"
                      id=""
                      onClick={() => closeModal()}
                      onKeyDown={() => closeModal()}
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </TransitionablePortal>
    </>
  );
}

export default FiltersModal;
