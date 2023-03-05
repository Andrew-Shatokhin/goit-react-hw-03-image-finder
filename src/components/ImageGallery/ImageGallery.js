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
    // images: null,
    query: '',
    entryData: [],
    loading: false,
    page: 1,
    error: null,
    loadMoreBtnShown: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.value;
    const nextQuery = this.props.value;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevStateQuery = prevState.query;

    if (prevQuery !== nextQuery) {
      this.setState(prev => ({
        ...prev,
        entryData: [],
        page: 1,
        query: nextQuery,
        loadMoreBtnShown: true,
      }));

      // console.log('1', this.state.page);
    }

    if (
      prevStateQuery !== this.state.query ||
      (prevPage !== nextPage && nextPage !== 1)
    ) {
      this.setState({ loading: true, page: this.state.page });
      // page: this.state.page;
      // console.log('2', this.state.page);

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

          this.setState(state => ({
            entryData: [...state.entryData, ...data.hits],
            loading: false,
          }));
        })
        .catch(error => this.setState({ error }));
      // .finally(() => this.setState({ loading: false }));
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
