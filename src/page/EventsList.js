import React, { useContext, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite'
import { useDidMount } from '../hooks/useDidMount'
import { StoreContext } from "../models/store";
import { Link } from "react-router-dom";
import { Card, Button, CardColumns, Pagination, Spinner } from 'react-bootstrap'
//TODO: Should use lightweight lib
import moment from 'moment'

const STEP_PAGINATOR = 10;

export const EventsList = observer(() => {
    const storeContext = useContext(StoreContext);
    const paginationState = useLocalStore(() => ({
      selectPage: 0,
      setSelectPage(selectNumber) {
        paginationState.selectPage = selectNumber
      },
      limit: 10,
      get paginationCount() {
        return storeContext.eventsPage.totalEvents / STEP_PAGINATOR
      },
      get paginationOffset() {
        return (paginationState.selectPage - 1) * STEP_PAGINATOR
      }
    }));

    useDidMount(() => {
      storeContext.fetchEvents()
    });

    const handleClickPaginationItem = (e) => {
      paginationState.setSelectPage(Number.parseInt(e.target.id, 10));
      storeContext.fetchEvents(paginationState.limit, paginationState.paginationOffset)
    };

    const createPaginationItems = () => {
      const paginationItems = [];
      for ( let page = 1; page <= paginationState.paginationCount; page++ ) {
        paginationItems.push(
          <Pagination.Item
            key={page}
            id={page}
            active={page === paginationState.selectPage}
            onClick={handleClickPaginationItem}>
            {page}
          </Pagination.Item>
        )
      }

      return paginationItems;
    };

    return (
      <div className="events-list container">
        {
          <Pagination className="justify-content-center">
            {createPaginationItems()}
          </Pagination>
        }
        {
          storeContext.eventsPage.loading ? (
            <div className="d-flex justify-content-center vh-100">
              <Spinner className="align-self-center" animation="border"/>
            </div>
          ) : (
            <div>
              <CardColumns>
                {
                  storeContext.eventsPage.events.map((event) => {
                    return (
                      <Card key={event.id}>
                        <Card.Img variant="top" src={event.logoUri}/>
                        <Card.Body>
                          <Card.Title>{event.name}</Card.Title>
                          <p className="mb-0 font-weight-lighter">
                            Start event in {moment(event.startTime).format("MM-DD-YYYY")}
                          </p>
                          <p className="mb-0 font-weight-lighter">
                            Finish event in {moment(event.finishTime).format("MM-DD-YYYY")}
                          </p>
                          <Button as={Link} to={`/action/${event.id}`} variant="primary">Get more info</Button>

                        </Card.Body>
                      </Card>
                    )
                  })
                }
              </CardColumns>
            </div>
          )
        }

      </div>
    );
  })
;