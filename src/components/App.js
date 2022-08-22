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
    liKeyArray: [],
    btnBull: false
  };

  async componentDidUpdate(prevProps, prevState) {
    const { inputValue, page, formAnswer } = this.state;
    const perPage = 12;
    if (
      prevState.inputValue !== inputValue ||
      prevState.page !== page
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=25829812-d39cfe0a6889efb95d5c21ab8&q=${inputValue}&webformatURL&largeImageURL&page=${page}&per_page=${perPage}&total`
        );
        const users = await response.json();

        if (formAnswer.length === 0) {
          this.setState({
            formAnswer: users.hits,
            btnBull: true,
          });
          if (users.hits.length < perPage) {
            this.setState({
              btnBull: false,
            });
            console.log(users.hits.length);
          }
        }

        if (formAnswer.length !== 0) {
          this.setState({
            formAnswer: [
              ...formAnswer,
              ...users.hits,
            ],
            btnBull: true,
          });
          if (users.hits.length < 12) {
            console.log(users.hits.length);
            this.setState({
              btnBull: false,
            });
          }

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
    const { featchAnswer, staticPage, testInputValue } = this.state;
    this.setState({
      page: staticPage,
      formAnswer: featchAnswer,
      inputValue: testInputValue,
      featchAnswer: [],
    });
  };
  handleClick = event => {
    event.preventDefault();
    this.setState({
      modal: event.target.src,
    });

  };
  render() {
    const { formAnswer, modal, btnBull, isLoading } = this.state;
    const { inputValue } = this.state.inputValue;
    return (
      <div className={styles.container}>

        <Searchbar
          value={inputValue}
          handleChange={this.handleChange}
          formSubmit={this.formSubmit}
        />
        ;

        {isLoading === true && <Loader />}
        <ImageGallery
          gallery={formAnswer}
          handleClick={this.handleClick}
        />
        {btnBull === true && (
          <Button nextPageFunk={this.nextPage} />
        )}
        {modal !== '' && (
          <Modal
            src={modal}
            onClose={this.onClose}
          />
        )}
      </div>
    );
  }
}
