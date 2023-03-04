import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import PropTypes from 'prop-types';
import threeDots from '../Loader/Loader';
import { Items } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/getImages';
import { List } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    error: null,
    page: 1,
    loadMoreBtnShown: true,
    entryData: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        page: 1,
        entryData: [],
        loadMoreBtnShown: true,
      });
      // console.log('1', this.state.page);
    }

    if (
      prevProps.value !== this.props.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      console.log('2', this.state.page);

      setTimeout(() => {
        getImages(this.props.value, this.state.page)
          .then(data => {
            if (data.total === 0) {
              this.setState({ loading: false });
              return toast.error(`Nothing was found for ${this.props.value}`, {
                position: toast.POSITION.TOP_CENTER,
              });
            }

            if (data.hits.length < 12) {
              this.setState({ loadMoreBtnShown: false });
            }

            this.setState(prevState => ({
              entryData: [...prevState.entryData, ...data.hits],
              loading: false,
            }));
          })
          .catch(error => this.setState({ error }));
        // .finally(() => this.setState({ loading: false }));
      }, 500);
    }
  }

  // handleDataAdd = () => {
  //   this.setState({

  //     page: 1,
  //     entryData: [],
  //     loading: true,
  //     loadMoreBtnShown: true,
  //   });

  // };

  onLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    return (
      <div>
        <List>
          {this.state.entryData.length > 0 &&
            this.state.entryData.map(item => (
              <Items items={item} key={item.id} />
            ))}
        </List>
        {this.state.entryData.length > 0 &&
          !this.state.loading &&
          this.state.loadMoreBtnShown && (
            <Button onLoadMore={this.onLoadMoreBtn} />
          )}
        {this.state.loading && threeDots}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
