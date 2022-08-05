import React, { Component } from "react";
import axios from "axios";

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName;
}

export function withApiProgress(WrappedComponent, apiPath) {
  return class extends Component {
    componentDidMount() {
      axios.interceptors.request.use((request) => {
        console.log("asa");
        if (request.url === apiPath) {
          this.setState({ pendingApiCall: true });
        }
        return request;
      });
      axios.interceptors.response.use(
        (response) => {
          if (response.config.url === this.props.path) {
            this.setState({ pendingApiCall: false });
            return response;
          }
        },
        (error) => {
          if (error.config.url === this.props.path) {
            this.setState({ pendingApiCall: false });
          }
          throw error;
        }
      );
    }
    state = {
      pendingApiCall: false,
    };
    render() {
      const { pendingApiCall } = this.state;
      return (
        <div>
          {React.cloneElement(this.props.children, {
            pendingApiCall: this.state.pendingApiCall,
          })}
        </div>
      );
    }
  };
}

class ApiProgress extends Component {
  componentDidMount() {
    axios.interceptors.request.use((request) => {
      console.log("a");
      if (request.url === this.props.path) {
        this.setState({ pendingApiCall: true });
      }
      return request;
    });
    axios.interceptors.response.use(
      (response) => {
        if (response.config.url === this.props.path) {
          this.setState({ pendingApiCall: false });
          return response;
        }
      },
      (error) => {
        if (error.config.url === this.props.path) {
          this.setState({ pendingApiCall: false });
        }
        throw error;
      }
    );
  }
  state = {
    pendingApiCall: false,
  };
  render() {
    const { pendingApiCall } = this.state;
    return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />;
  }
}
