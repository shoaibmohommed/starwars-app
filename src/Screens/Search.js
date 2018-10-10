import React from "react";
import { FormControl, Button, Modal } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";
import { setPlanetList } from "../Redux/actions";
import PropType from "prop-types";
import { connect } from "react-redux";
import Util from "../Util";
import swal from 'sweetalert';
const LukeSkywalker = 'Luke Skywalker';
const MAX_SEARCH_LIMIT = 15;
const PlanetList = ({ list, onPlanetDetailClick }) => {
  return list.map((data, key) => {
    return (
      <div
        style={{ fontSize: 9 + data.residents.length }}
        className="planet-list-item"
        key={key}
        onClick={() => onPlanetDetailClick(data)}
      >
        <span>{data.name}</span>
        <span>{data.residents.length}</span>
      </div>
    );
  });
};

class Search extends React.Component {
  state = { currentValue: "", showLoader: false, showPopup: false, planetDetails: {}, requestCounter: 0 };

  componentWillMount() {
    if (!this.props.username) {
      //  this.context.router.history.push("/");
    }
  }
  getData = (url, value = this.state.currentValue) => {
    let { lastRequestTime, requestCounter } = this.state;
    const currentTime = new Date();

    if (this.props.username !== LukeSkywalker && lastRequestTime) {
      let oldTime = lastRequestTime.getTime();
      let difference = Math.round((currentTime.getTime() - oldTime) / 60000);
      // check if 15 requests are completed within a minute
      if (difference <= 1 && requestCounter >= MAX_SEARCH_LIMIT) {
        swal("alert", "You cannot search more that 15 times within a minute.");
        return;
      } else if (requestCounter === MAX_SEARCH_LIMIT) { // reset the counter and time when 1 min wait is over.
        lastRequestTime = null;
        requestCounter = 0;
      }
    }

    // show the loader and also update the user typed value in input field.
    this.setState({ showLoader: true, currentValue: value });
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.props.dispatch(setPlanetList(responseData));
        let newState = { showLoader: false };

        if (!lastRequestTime) {
          newState["lastRequestTime"] = new Date();
        } else {
          newState["lastRequestTime"] = lastRequestTime;
        }
        requestCounter++;
        newState.requestCounter = requestCounter;
        this.setState(newState);
      })
      .catch(e => {
        this.setState({ showLoader: false });
      });
  };

  handleChange = event => {
    let value = event.target.value;

    this.getData(`${Util.BaseUrl}planets?search=${value}`, value);
  };

  onPagingChange = propName => {
    const url = this.props[propName];
    this.getData(url);
  };

  handleClose = () => {
    this.setState({ planetDetails: {}, showPopup: false });
  };

  onPlanetDetailClick = (item) => {
    this.setState({ showPopup: true, planetDetails: item });
  };

  render() {
    const { planetsList, nextPage, prevPage } = this.props;

    return (
      <div className="container text-center">
        <h1>Welcome to the planet search</h1>

        <FormControl
          type="text"
          value={this.state.currentValue}
          style={{ margin: "5px auto", width: "700px" }}
          placeholder="Enter Planet Name"
          name="username"
          onChange={this.handleChange}
        />
        <ScaleLoader
          className={Util.overrideWithAbsolute}
          height={35}
          width={4}
          radius={2}
          color={"#123abc"}
          loading={this.state.showLoader}
        />
        {planetsList.length > 0 ? <div className='planet-list-container'>
          <PlanetList list={planetsList} onPlanetDetailClick={this.onPlanetDetailClick} />
        </div> : null}
        {prevPage && (
          <Button
            bsStyle="danger"
            style={{ margin: "10px" }}
            onClick={() => this.onPagingChange("prevPage")}
          >
            Previous
          </Button>
        )}
        {nextPage && (
          <Button
            bsStyle="danger"
            style={{ margin: "10px" }}
            onClick={() => this.onPagingChange("nextPage")}
          >
            Next
          </Button>
        )}
        <Modal show={this.state.showPopup} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Planet <span style={{ color: '#e83630' }}> <b>{this.state.planetDetails.name}</b></span></Modal.Title>
          </Modal.Header>
          <Modal.Body><pre><code>{JSON.stringify(this.state.planetDetails)}</code></pre></Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
Search.contextTypes = {
  router: PropType.object.isRequired
};
export default connect(store => {
  const { reducer } = store;
  const { planetsData, username } = reducer;
  return {
    planetsList: planetsData.results || [],
    nextPage: planetsData.next,
    prevPage: planetsData.previous,
    username: username
  };
})(Search);
