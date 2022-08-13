import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './MoreButton/Button';
import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import styles from '../components/Loader/Loader.module.css';


export class App extends Component {
  state = {
    inputValue: "",
    featchAnswer: [],
    isLoading: false,
    error: null,
    formAnswer: [],
    modal: '',
    staticPage: 1,
    page: 1,
    testInputValue: '',
    liKeyArray: []
  };

  async componentDidUpdate(prevProps, prevState) {
    const { inputValue, page } = this.state;
    if (
      prevState.inputValue !== inputValue ||
      prevState.page !== page
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=25829812-d39cfe0a6889efb95d5c21ab8&q=${inputValue}&webformatURL&largeImageURL&page=${page}&per_page=${12}`
        );
        const users = await response.json();
        if (this.state.formAnswer === []) {
          this.setState({
            featchAnswer: users.hits,
          });

        }
        if (this.state.formAnswer !== []) {
          this.setState({
            formAnswer: [
              ...this.state.formAnswer,
              ...users.hits,
            ],
          });

        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }
  onClose = () => {
    this.setState({ modal: '' });
  };
  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleChange = event => {
    this.setState({
      testInputValue: event.target.value,
    });
  };
  formSubmit = event => {
    event.preventDefault();
    this.setState({
      inputValue: this.state.testInputValue,
    });
    const featchAnswer = this.state.featchAnswer;
    this.setState({
      formAnswer: featchAnswer,
    });
    this.setState({
      page: this.state.staticPage,
    });
  };
  handleClick = event => {
    event.preventDefault();
    this.setState({
      modal: event.target.src,
    });

  };
  render() {
    const { inputValue } = this.state.inputValue;
    return (
      <div className={styles.container}>

        <Searchbar

          value={inputValue}
          handleChange={this.handleChange}
          formSubmit={this.formSubmit}
        />
        ;

        {this.state.isLoading === true && <Loader />}
        <ImageGallery
          gallery={this.state.formAnswer}
          handleClick={this.handleClick}
        />
        {this.state.formAnswer.length > 0 && (
          <Button nextPageFunk={this.nextPage} />
        )}
        {this.state.modal !== '' && (
          <Modal
            src={this.state.modal}
            onClose={this.onClose}
          />
        )}
      </div>
    );
  }
}
