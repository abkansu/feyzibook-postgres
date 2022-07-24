import React, { Component } from "react";
import axios from "axios";

export function withApiProgress(WrappedComponent, apiPath) {
  return class extends Component {
    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        this.updateApiCall(request.url, true);
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (response) => {
          this.updateApiCall(response.config.url, false);
          return response;
        },
        (error) => {
          this.updateApiCall(error.config.url, false);
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApiCall(url, apiInProgress) {
      if (url === apiPath) {
        this.setState({ pendingApiCall: apiInProgress });
      }
    }
    render() {
      return (
        <WrappedComponent
          pendingApiCall={this.state.pendingApiCall}
          {...this.props}
        />
      );
    }
  };
}

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const useApiProgress = (apiMethod, apiPath, strictPath) => {
//   const [pendingApiCall, setPendingApiCall] = useState(false);

//   useEffect(() => {
//     let requestInterceptor, responseInterceptor;

//     const updateApiCallFor = (method, url, inProgress) => {
//       if (method !== apiMethod) {
//         return;
//       }
//       if (strictPath && url === apiPath) {
//         setPendingApiCall(inProgress);
//       } else if (!strictPath && url.startsWith(apiPath)) {
//         setPendingApiCall(inProgress);
//       }
//     };

//     const registerInterceptors = () => {
//       requestInterceptor = axios.interceptors.request.use(request => {
//         const { url, method } = request;
//         updateApiCallFor(method, url, true);
//         return request;
//       });

//       responseInterceptor = axios.interceptors.response.use(
//         response => {
//           const { url, method } = response.config;
//           updateApiCallFor(method, url, false);
//           return response;
//         },
//         error => {
//           const { url, method } = error.config;
//           updateApiCallFor(method, url, false);
//           throw error;
//         }
//       );
//     };

//     const unregisterInterceptors = () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };

//     registerInterceptors();

//     return function unmount() {
//       unregisterInterceptors();
//     };
//   }, [apiPath, apiMethod, strictPath]);

//   return pendingApiCall;
// };
