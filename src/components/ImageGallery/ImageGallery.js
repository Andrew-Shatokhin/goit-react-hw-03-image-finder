// import { Images } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { getImages } from 'services/getImages';
import { List, Item, Image } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      getImages(this.props.value)
        .then(response => response.json())
        .then(images => {
          this.setState({ images });
        });
    }
  }

  render() {
    return (
      this.state.images &&
      this.state.images.hits.map(({ id, webformatURL, tags }) => {
        // const { id, webformatURL, tags } = el;
        return (
          <List>
            <Item key={id}>
              <Image src={webformatURL} alt={tags} />
            </Item>
          </List>
        );
      })
    );
  }
}
