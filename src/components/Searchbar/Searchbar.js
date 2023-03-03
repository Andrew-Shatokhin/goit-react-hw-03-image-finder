import { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { Header, Form, SearchFormButton, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  // handleChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // };
  handleChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      alert('The search string cannot be empty!');
      return;
    }

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch>Search</ImSearch>
          </SearchFormButton>

          <Input
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}

// export default class Searchbar extends Component {
//   state = {
//     image: '',
//   };

//   handleNameChange = event => {
//     this.setState({ image: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.image.trim() === '') {
//       alert('The search string cannot be empty!');
//       return;
//     }
//     this.props.onSubmit(this.state.image);
//     this.setState({ image: '' });
//   };

//   render() {
//     return (
//       <header>
//         <form onSubmit={this.handleSubmit}>
//           <button type="submit">
//             <ImSearch>Search</ImSearch>
//           </button>

//           <input
//             type="text"
//             name="image"
//             value={this.state.image}
//             onChange={this.handleNameChange}
//             // autocomplete="off"
//             // autofocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
