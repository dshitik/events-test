import React, { useContext } from 'react';
import {
  useParams,
} from "react-router-dom";
import { observer, useLocalStore } from 'mobx-react-lite'
import { useDidMount } from "../../hooks/useDidMount";
import { StoreContext } from "../../models/store";
import { patchEventsAPI } from '../../api/patchEventAPI'
import { Spinner, Button } from "react-bootstrap";
import { EventField } from './EventField'


export const EventInfo = observer(() => {
  const storeContext = useContext(StoreContext);
  const { id } = useParams();
  const eventState = useLocalStore(() => ({
    changedInfo: new Map(),
    addChangedInfo(type, value) {
      eventState.changedInfo.set(type, value)
    },
    get isDisabledButton() {
      return eventState.changedInfo.size === 0
    }
  }));

  const handleChangeInfo = (type, value) => {
    eventState.addChangedInfo(type, value)
  };
  const handleSendDataToServer = () => {
    patchEventsAPI({ id, data: eventState.changedInfo }).then(res => {
      eventState.changedInfo.clear()
    }).catch(err => {
      console.log({ err })
    })
  }

  useDidMount(() => {
    storeContext.fetchEvent(id)
  });

  return (
    <div className="d-flex flex-column container">
      {
        !storeContext.currentEvent.loading ? (
          <div>
            <p className="font-weight-bolder">Short info:</p>
            <EventField type="name" value={storeContext.currentEvent.info.name} onClick={handleChangeInfo}/>
            <EventField type="URI" value={storeContext.currentEvent.info.uri} onClick={handleChangeInfo}/>
            <EventField type="category" value={storeContext.currentEvent.info.category.name}
                        onClick={handleChangeInfo}/>
            <EventField type="organizer" value={storeContext.currentEvent.info.organizer.name}
                        onClick={handleChangeInfo}/>

            <Button disabled={eventState.isDisabledButton} onClick={handleSendDataToServer}>Send to server</Button>
            <p className="text-center font-weight-bolder">DETAILS</p>
            <div dangerouslySetInnerHTML={{ __html: storeContext.currentEvent.info.description }}/>
          </div>
        ) : (
          <div className="d-flex justify-content-center vh-100">
            <Spinner className="align-self-center" animation="border"/>
          </div>
        )
      }
    </div>
  )
});