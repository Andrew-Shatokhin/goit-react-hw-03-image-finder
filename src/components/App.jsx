import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export default class App extends Component {
  state = {
    imageSearch: '',

  };

  
  handleSubmit = (imageSearch) => {
    this.setState({ imageSearch });
  };


  render() {

    return (
      <Layout>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={this.state.imageSearch}  />
        {this.state.showModal && this.state.modalImage && (
          <Modal onClose={this.toggleModal} modalImage={this.modalImage} />
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
