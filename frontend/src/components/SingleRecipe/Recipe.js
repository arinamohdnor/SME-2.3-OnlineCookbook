import React, { Component } from "react";

import { Link } from "react-router-dom";
import { Redirect } from "react-router"
import axios from "axios";
import Searchbar from "../Search/SearchBar";
import ForkedBy from '../Modals/ForkedBy'
import hearticon from "../../images/orange-hearts.png";
import veganicon from "../../images/vegan3.png";
import vegetarianicon from "../../images/vegetarian3.png";
import cheficon from "../../images/chefhat.png";
import "./Recipe.css";
import $ from "jquery";
// import "nutrition-label-jquery-plugin/nutritionLabel-min";
// import "nutrition-label-jquery-plugin/nutritionLabel-min.css"

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites_count: "",
      username: "",
      user_id: "",
      recipe_name: "",
      recipe: "",
      img: "",
      isvegeterian: "",
      isvegan: "",
      comments: "",
      ingredients: [],
      canFavorite: true,
      comment: "",
      comments_id: false,
      fork: "",
      forkedFrom: "",
      forked: false,
      forkList: [],
      seenCommentsArray: [],
    };
  }

  componentDidMount() {
    this.loadsRecipe();
    axios
      .get(`/users/singlerecipe/${this.props.user.recipeID}`)
      .then(res => {
        var postData = {
          "query": res.data[0].recipe_name,
          "num_servings": "1",
          // "aggregate": "string",
          // "line_delimited": false,
          // "use_raw_foods": false,
          // "include_subrecipe": false,
          // "timezone": "US/Eastern",
          // "consumed_at": null,
          // "lat": null,
          // "lng": null,
          // "meal_type": 0,
          // "use_branded_foods": false,
          // "locale": "en_US"
        }

        // let testVar = 1;
        // let testVarA = 5;
        // let testVarB = 1;

        // function test(){
        //   let testVarDifferences = testVarA - testVarB;
        //   let testVarRound = 10;
        //   console.log(testVarDifferences);
        //   console.log(testVarRound);
        //   if (testVarDifferences < testVarRound){
        //     testVarA = testVarA + 1;
        //     console.log(testVarA);
        //     // test();
        //   } else {
        //     console.log(testVarDifferences);
        //     console.log(testVar);
        //   }
        // }

        // test();

        let axiosConfig = {
          headers: {
              "Content-Type": "application/json", // request content type
              "x-app-id": "93ad3166",
              "x-app-key": "a75891f09ced04bd0b562c6c447772c8",
          }
        };
        console.log("helo1");
        
        axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', postData, axiosConfig)
        .then((res2) => {
          // console.log("RESPONSE RECEIVED: ", res.data.foods[0].nf_calories);
          console.log("RESPONSE RECEIVED: ", res2.data.foods[0]);
          if ( res2.data.foods[0].nf_sugars == null) {
            res2.data.foods[0].nf_sugars = 0;
          }
          $("#nutritional_label").html("" +

          "<section class='performance-facts' style='width:100%; margin-left:0; background-color: white'>" +
            "<header class='performance-facts__header'>" +
            " <h1 class='performance-facts__title'>Nutrition Facts - " + res.data[0].recipe_name + "</h1> " +
            " <p>Serving Size " + res2.data.foods[0].serving_qty + " cup (about " + res2.data.foods[0].serving_weight_grams + "g)" +
            "</header>" +
            "<table class='performance-facts__table'>" +
            " <thead>" +
            "   <tr>" +
            "     <th colspan='3' class='small-info'>" +
            "       Amount Per Serving" +
            "     </th>" +
            "   </tr>" +
            " </thead>" +
            " <tbody>" +
            "   <tr>" +
            "     <th colspan='2'>" +
            "       <b>Calories</b>" +
            "       " + res2.data.foods[0].nf_calories +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>% Daily Value*</b>" +
            "     </td>" +
            "   </tr>" +
            "   <tr>" +
            "   <th colspan='2'>" +
            "       <b>Total Fat</b>" +
            "       " + res2.data.foods[0].nf_total_fat + "g" +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_total_fat/32)*100) + "%</b>" +
            "     </td>" +
            "   </tr>" +
            "   <tr>" +
            "     <td class='blank-cell'>" +
            "     </td>" +
            "     <th>" +
            "       &emsp; Saturated Fat" +
            "       " + res2.data.foods[0].nf_saturated_fat + "g" +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_saturated_fat/10)*100) + "%</b>" +
            "     </td>" +
            "   </tr>" +
            // "   <tr>" +
            // "     <td class='blank-cell'>" +
            // "     </td>" +
            // "     <th>" +
            // "       Trans Fat" +
            // "       0g" +
            // "     </th>" +
            // "     <td class='text-right'>0%" +
            // "     </td>" +
            // "   </tr>" +
            "   <tr>" +
            "     <th colspan='2'>" +
            "       <b>Cholesterol</b>" +
            "       " + res2.data.foods[0].nf_cholesterol + "mg" +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_cholesterol/150)*100) + "%</b>" +
            "     </td>" +
            "   </tr>" +
            "   <tr>" +
            "     <th colspan='2'>" +
            "       <b>Sodium</b>" +
            "       " + res2.data.foods[0].nf_sodium + "mg" +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_sodium/1200)*100) + "%</b>" +
            "     </td>" +
            "   </tr>" +
            "  <tr>" +
            "     <th colspan='2'>" +
            "       <b>Total Carbohydrate</b>" +
            "       " + res2.data.foods[0].nf_total_carbohydrate + "g" +
            "     </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_total_carbohydrate/150)*100) + "%</b>" +
            "     </td>" +
            "  </tr>" +
            "   <tr>" +
            "     <td class='blank-cell'>" +
            "     </td>" +
            "     <th>" +
            "       &emsp; Dietary Fiber" +
            "       " + res2.data.foods[0].nf_dietary_fiber + "g" +
            "    </th>" +
            "     <td class='text-right'>" +
            "       <b>" + Math.round((res2.data.foods[0].nf_dietary_fiber/12)*100) + "%</b>" +
            "     </td>" +
            "   </tr>" +
            "   <tr>" +
            "     <td class='blank-cell'>" +
            "     </td>" +
            "     <th>" +
            "       &emsp; Sugars" +
            "       " + res2.data.foods[0].nf_sugars + "g" +
            "     </th>" +
            "     <td class='text-right'>" +
            "     <b>-</b></td>" +
            "   </tr>" +
            "   <tr class='thick-end'>" +
            "     <th colspan='2'>" +
            "       <b>Protein</b>" +
            "       " + res2.data.foods[0].nf_protein + "g" +
            "     </th>" +
            "     <td class='text-right'>" +
            "     <b>" + Math.round((res2.data.foods[0].nf_protein/50)*100) + "%</b></td>" +
            "   </tr>" +
            " </tbody>" +
            "</table>" +
                        
            "<p style='font-size:1rem'>* <i>Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs:</i></p>" +
          
          
          
            "<p style='font-size:1rem' class='text-center'>" +

            " Calories per gram:" +
            " Fat 9" +
            " &bull;" +
            " Carbohydrate 4" +
            " &bull;" +
            " Protein 4" +
            "</p>" +
            
            "</section>");

            // res.data.foods[0].nf_calories);
        // })

        
        var running = 10;
        var walking = 10;
        var postDataCalories;

        var axiosConfig2 = {
          headers: {
              "Content-Type": "application/json", // request content type
              "x-app-id": "940bc30e",
              "x-app-key": "045d1dc140387eab8e7e61a76f592008",
          }
        };

        const convertMinsToTime = (mins) => {
          let hours = Math.floor(mins / 60);
          let minutes = mins % 60;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          return `${hours ? `${hours} hours:` : ' '}${minutes} minutes`;
        }

      async function runLoop() {
        var limit = 0;
        var running = 20;

        while (limit == 0) {
          // line 249 sampai line 258 ni patutnya bawak masuk kat line 271, tapi since dia punya value takleh bawa sampai keluar 'then', itu problem tu, if kau boleh figure out cane nak bawa keluar variable updated dari 'then' tu kira settle dah
          console.log("restart");
          postDataCalories = {
            "query": `${running} minutes run and ${walking} minutes walking`,
            "gender":"male",
            "weight_kg":63.5,
            "height_cm":167.64,
            "age":30
          };
          console.log(`${running} minutes run and ${walking} minutes walking`);
          var res3 = await axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', postDataCalories, axiosConfig2)
          // .then((res3) => {
            console.log("exercise RESPONSE RECEIVED: ", res3);
            var caloriesFood = res2.data.foods[0].nf_calories;
            var caloriesExercise = res3.data.exercises[0].nf_calories;
            var caloriesDifferences = caloriesFood - caloriesExercise;
            console.log("hi " + caloriesDifferences);
            if (caloriesDifferences < 50){
              var caloriesRun = res3.data.exercises[0].duration_min;
              var caloriesWalk = (caloriesRun)*2;
              $("#calories_burned").html("" +
              "<br><div class='rounded-box burn-calories ng-scope'>" +
              "<div class='box-title ng-binding'> How long would it take to burn off " + caloriesFood + " KCal?" +
              "</div>" +
              "<div class='box-content'>" +
              "  <table class='table m-b-none'>" +
              "    <tr>" +
              "      <td>Running (6mph)" +
              //  + res3.data.exercises[0].name + 
               "</td>" +
              "      <td class='ng-binding'>" + convertMinsToTime(caloriesRun) + "</td>" +
              "    </tr>" +
              "   <tr>" +
              "     <td>Walking (3mph)" +
              //  + res3.data.exercises[1].name + 
               "</td>" +
              "     <td class='ng-binding'>" + convertMinsToTime(caloriesWalk) + "</td>" +
              "   </tr>" +
              "   </tbody>" +
              " </table>" +
              " <div>" +
              " <small> Values estimated based on person weighing 140 lbs." +
              "   </small>" +
              " </div>" +
              "</div>" +
              "</div>");
              console.log('done');
              limit = 1;
            } else {
              console.log('nope');
              running = running + 10;
              console.log("restart");
              postDataCalories = {
                "query": `${running} minutes run and ${walking} minutes walking`,
                "gender":"male",
                "weight_kg":63.5,
                "height_cm":167.64,
                "age":30
              };
            }
          // })
          // limit = 1; //patut buang ni, tapi in a way macam dapatkan value from line 268, if kau boleh bawa keluar that value, boleh cancel the loop and hidup aman
        }
        console.log(limit);
      }

      runLoop();


        // function axiosPostExercise(){
        //   axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', postDataCalories, axiosConfig2)
        //   .then((res3) => {
        //     console.log("RESPONSE RECEIVED: ", res3);
        //     let caloriesFood = res2.data.foods[0].nf_calories;
        //     let caloriesExercise = res3.data.exercises[0].nf_calories;
        //     let caloriesDifferences = caloriesFood - caloriesExercise;
        //     if (caloriesDifferences < caloriesDifferences - 10 || caloriesDifferences > caloriesDifferences + 10){
        //       $("#calories_burned").html("" +
          
        //       "<br><div class='rounded-box burn-calories ng-scope'>" +
        //       "<div class='box-title ng-binding'> How long would it take to burn off " + caloriesFood + " KCal?" +
        //       "</div>" +
        //       "<div class='box-content'>" +
        //       "  <table class='table m-b-none'>" +
        //       "    <tr>" +
        //       "      <td>" + res3.data.exercises[0].name + "</td>" +
        //       "      <td class='ng-binding'>" + res3.data.exercises[0].duration_min + " minutes</td>" +
        //       "    </tr>" +
        //       "   <tr>" +
        //       "     <td>" + res3.data.exercises[1].name + "</td>" +
        //       "     <td class='ng-binding'>" + res3.data.exercises[1].duration_min + " minutes</td>" +
        //       "   </tr>" +
        //       "   </tbody>" +
        //       " </table>" +
        //       " <div>" +
        //       " <small> Values estimated based on person weighing 140 lbs." +
        //       "   </small>" +
        //       " </div>" +
        //       "</div>" +
        //       "</div>");
        //     } else {
        //       running = running + 20;
        //       console.log(running);
        //       axiosPostExercise();
        //     }
        //   })
        // }

        // axiosPostExercise();
        

        // axios.post('https://trackapi.nutritionix.com/v2/natural/exercise', postDataCalories, axiosConfig2)
        // .then((res3) => {
        //   console.log("RESPONSE RECEIVED: ", res3); 
        //   let caloriesFood = res2.data.foods[0].nf_calories;
        // $("#calories_burned").html("" +
          
        //       "<br><div class='rounded-box burn-calories ng-scope'>" +
        //       "<div class='box-title ng-binding'> How long would it take to burn off " + caloriesFood + " KCal?" +
        //       "</div>" +
        //       "<div class='box-content'>" +
        //       "  <table class='table m-b-none'>" +
        //       "    <tr>" +
        //       "      <td>" + res3.data.exercises[0].name + "</td>" +
        //       "      <td class='ng-binding'>" + res3.data.exercises[0].duration_min + " minutes</td>" +
        //       "    </tr>" +
        //       "   <tr>" +
        //       "     <td>" + res3.data.exercises[1].name + "</td>" +
        //       "     <td class='ng-binding'>" + res3.data.exercises[1].duration_min + " minutes</td>" +
        //       "   </tr>" +
        //       "   </tbody>" +
        //       " </table>" +
        //       " <div>" +
        //       " <small> Values estimated based on person weighing 140 lbs." +
        //       "   </small>" +
        //       " </div>" +
        //       "</div>" +
        //       "</div>");   
        //     })
        })
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
      console.log("helo2");
    


  }

  componentWillReceiveProps(props) {
    this.loadsRecipe();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      this.loadsRecipe()
    }
  }

  loadsRecipe = () => {
    const { username, forkedFrom, forkList } = this.state
    axios
      .get(`/users/singlerecipe/${this.props.user.recipeID}`)
      .then(res => {
        this.setState({
          favorites_count: res.data[0].favorites_count,
          username: res.data[0].username,
          user_id: res.data[0].user_id,
          recipe_name: res.data[0].recipe_name,
          recipe: res.data[0].recipe,
          img: res.data[0].img,
          isvegeterian: res.data[0].isvegeterian,
          isvegan: res.data[0].isvegan,
          fork: res.data[0].fork,
          forkedFrom: res.data[0].forkedfrom
        });
      })
      .then(() => {
        if (this.props.id === this.state.user_id) {
          axios
            .patch(`/users/seenCommentsChangeByRecipeId/${this.props.user.recipeID}`)
            .then( () => {
              this.setState({
                seenCommentsArray: true
              })
            })
        }
      })
      .then( () => {
        axios
          .get(`/users/isfavorite/${this.props.user.recipeID}`)
          .then(res => {
            if (res.data.length === 0) {
              this.setState({
                canFavorite: false
              });
            } else {
              this.setState({
                canFavorite: true
              });
            }
          })
      })
      .then(() => {
        axios
        .get(`/users/getingredients/${this.props.user.recipeID}`)
        .then(res => {
          this.setState({
            ingredients: res.data
          });
        })
      })
      .then((user) => {
        axios
        .get(`/users/comment/${this.props.user.recipeID}`)
        .then(res => {
          this.setState({
            comments: res.data
          });
        })
      })
      .then( () => {
          axios
            .get(`/users/seenCommentsByRecipeId/${this.props.user.recipeID}`)
            .then( (res) => {
              this.setState({
                seenCommentsArray: res.data
              })
            })
      })
      .then(() => {
        axios
          .get(`/users/getforkedrecipes/${this.props.user.recipeID}`)
          .then(res => {
            this.setState({
              forkList: res.data
            })
          })
      })
      .catch(error => {
        console.log("error in Recipe componentDidMount: ", error);
      });
    }


  handleClickLike = e => {
    e.preventDefault();
    const { username, forkedFrom, forkList } = this.state
    axios
      .post("/users/favorite", {
        recipe_id: this.props.user.recipeID,
        seen: false
      })
      .then(() => {
        this.setState({
          canFavorite: true
        });
      })
      .then(() =>
        axios
          .get(`/users/singlerecipe/${this.props.user.recipeID}`)
          .then(res => {
            this.setState({
              favorites_count: res.data[0].favorites_count
            });
          })
      )
      .catch(err => {
        console.log(err);
      });
  };

  handleClickDisLike = e => {
    e.preventDefault();

    axios
      .post(`/users/unfavorite`, {
        recipe_id: this.props.user.recipeID
      })
      .then(() => {
        this.setState({
          canFavorite: false
        });
      })
      .then(() =>
        axios
          .get(`/users/singlerecipe/${this.props.user.recipeID}`)
          .then(res => {
            this.setState({
              favorites_count: res.data[0].favorites_count
            });
          })
      )
      .catch(err => {
        console.log(err);
      });
  };

  handleInputComment = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.comments_id);
    if (this.state.comments_id) {
      axios
        .patch(`/users/editComment/${this.state.comments_id}`, {
          recipe_id: this.props.user.recipeID,
          comment: this.state.comment
        })
        .then(res => {
          axios
            .get(`/users/comment/${this.props.user.recipeID}`)
            .then(res => {
              this.setState({
                comments: res.data,
                comment: ""
              });
            })
            .catch(error => {
              console.log(error);
            });
          this.setState({
            comments_id: false,
            comment: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (this.props.id === this.state.user_id) {
        axios
          .post("/users/addComment", {
            recipe_id: this.props.user.recipeID,
            comment: this.state.comment,
            seen: true
          })
          .then(res => {
            axios
              .get(`/users/comment/${this.props.user.recipeID}`)
              .then(res => {
                this.setState({
                  comments: res.data,
                  comment: ""
                });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post("/users/addComment", {
            recipe_id: this.props.user.recipeID,
            comment: this.state.comment,
            seen: false
          })
          .then(res => {
            axios
              .get(`/users/comment/${this.props.user.recipeID}`)
              .then(res => {
                this.setState({
                  comments: res.data,
                  comment: ""
                });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  handleClickEdit = e => {
    axios
      .get(`/users/getsinglecomment/${e.target.id}`)
      .then(res => {
        this.setState({
          comment: res.data[0].comment,
          comments_id: res.data[0].comments_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

    handleClickDeleteComment = e => {
        axios
            .get(`/users/getsinglecomment/${e.target.id}`)
            .then(res => {
            this.deleteComment(res.data[0].comment,res.data[0].comments_id);
            })
            .catch(err => {
                console.log(err);
            });
    };

    deleteComment(commentData, comments_id) {
        console.log(commentData)
        axios
            .patch(`/users/deleteComment/${comments_id}`, {
                recipe_id: this.props.user.recipeID,
                comment: commentData
            })
            .then(res => {
                axios
                    .get(`/users/comment/${this.props.user.recipeID}`)
                    .then(res => {
                        this.setState({
                            comments: res.data,
                            comment: ""
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.setState({
                    comments_id: false,
                    comment: ""
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

  test = e => {

    // var postData = {
    //   "query": "chicken",
    //   "num_servings": "1",
    //   "aggregate": "string",
    //   "line_delimited": false,
    //   "use_raw_foods": false,
    //   "include_subrecipe": false,
    //   "timezone": "US/Eastern",
    //   "consumed_at": null,
    //   "lat": null,
    //   "lng": null,
    //   "meal_type": 0,
    //   "use_branded_foods": false,
    //   "locale": "en_US"
    // };
    
    // let axiosConfig = {
    //   headers: {
    //       "Content-Type": "application/json", // request content type
    //       "x-app-id": "93ad3166",
    //       "x-app-key": "a75891f09ced04bd0b562c6c447772c8",
    //   }
    // };
    // console.log("helo1");
    
    // axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', postData, axiosConfig)
    // .then((res) => {
    //   console.log("RESPONSE RECEIVED: ", res);
    //   // $("#nutritional_label").html(res);
    // })
    // .catch((err) => {
    //   console.log("AXIOS ERROR: ", err);
    // })
    // console.log("helo2");

  };

  handleClickEditRecipe = (e) => {
    <Redirect push to="/cb/editRecipe/:recipeID" />
  }

  handleClickDelete = (e) => {
    axios
      .patch(`/users/deleteIngredients`, {
        recipe_id: this.props.user.recipeID
      })
      .then( (res) => {
        axios
          .patch(`/users/deleteComments`, {
            recipe_id: this.props.user.recipeID
          })
          .then( (res) => {
            axios
              .patch(`/users/deleteFavorites`, {
                recipe_id: this.props.user.recipeID
              })
              .then( (res) => {
                axios
                  .patch(`/users/deleteRecipe`, {
                    recipe_id: this.props.user.recipeID
                  })
                  .catch( (err) => {
                    console.log(err);
                  })
              })
              .catch( (err) => {
                console.log(err);
              })
          })
          .catch( (err) => {
            console.log(err);
          })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  handleSubmitFork = (e) => {
    e.preventDefault();
    const { recipe_name,
            recipe,
            description,
            ingredients,
            ingredientsList,
            isvegeterian,
            isvegan,
            img,
            recipe_id,
            fork,
            username,
            forkedFrom } = this.state
    axios
      .post('/users/addRecipe', {
        recipe_name: recipe_name,
        description: description,
        recipe: recipe,
        img: img,
        isvegeterian: isvegeterian,
        isvegan: isvegan,
        fork: fork,
        forkedFrom: username,
        forkedID: this.props.user.recipeID
      })
      .then(res => {
        this.setState({
          recipe_id: res.data.recipe_id
        })
        axios
          .post(`/users/addIngredients/${res.data.recipe_id}`, {
            ingredients: ingredients
          })
      })
      .then( () => {
        this.setState({
          forked: true
        })
      })
      .catch(err => {
        this.setState({
          message: "Error posting new image"
        })
      })
  }


  render() {

    const {
      favorites_count,
      username,
      user_id,
      recipe_name,
      recipe,
      img,
      isvegeterian,
      isvegan,
      ingredients,
      comments,
      canFavorite,
      comment,
      fork,
      forked,
      forkedFrom,
      forkList
    } = this.state;
    if (forked) {
      return(<Redirect to={`/cb/profile/${this.props.id}`} />)
    }
    if (this.props.user) {
      return (
        <div>
          <Searchbar user={this.props.userinfo}/>
          <div className="singleRecipeContainer">
          <div className="recipeBox singleRecipePageBox">
            <div className="singleRecipeIntroLine">
              <h1 className="singleRecipeHeader"> {recipe_name} </h1>
              {isvegan ? (
                <img src={veganicon} className="singleRecipeVeganIcon" />
              ) : (
                ""
              )}
              {isvegeterian && !isvegan ? (
                <img src={vegetarianicon} className="singleRecipeVeganIcon" />
              ) : (
                ""
              )}
              {!canFavorite ? (
                <img
                  onClick={this.handleClickLike}
                  src={hearticon}
                  title="Favorite"
                  className="heartIconFavorite"
                />
              ) : (
                <img
                  onClick={this.handleClickDisLike}
                  src={hearticon}
                  className="heartIconUnfavorite"
                />
              )}
              <p className="recipeFavoritesCount">
                {" "}
                {this.state.favorites_count}
              </p>
              <div>
              <Link to={`/cb/profile/${user_id}`} className="singleRecipeUsernameLink">
              <img className="singleRecipeChefIcon" src="https://cdn0.iconfinder.com/data/icons/kitchen-and-cooking/512/salting_cooking_hand_sprinkle_salt_flat_design_icon-256.png" />
                <h3 className="singleRecipeUsername"> {username} </h3>{" "}
              </Link>
              </div>
            </div>
            <div className="singleRecipeRight">
              <img src={img} alt="recipe_image" className="singleRecipeImage" />
            </div>
            <div className="singleRecipeButtons">
                <div class="mainButtons">
                <br/>
                { this.props.id === user_id?
                  <Link to={`/cb/editRecipe/${this.props.user.recipeID}`}><button id="edit_recipe" className="singleRecipeSubmit">Edit Recipe</button></Link>: ""
                }{" "}
                { this.props.id === user_id?
                  <Link to={`/cb/feed`}><button id="delete_recipe" className="singleRecipeSubmit" onClick={this.handleClickDelete}>Delete Recipe</button></Link>: ""
                }
                { this.props.id !== user_id? (fork?
                  <button className="singleRecipeSubmit" onClick={this.handleSubmitFork}>Fork</button>
                : ""): ""}
                </div>
              <div id="nutritional_label"></div>
                <div>
                { forkedFrom? <p>forked from {forkedFrom}</p>: ""} <br/>
                { forkList.length !== 0 ? <ForkedBy forks={forkList} /> : ''}
                </div>

            </div>

           <div className="singleRecipeLeft">
            {/* <h3 className="singleRecipeIngredientsTitle"> Nutritional Info </h3>
              <ul type="none">
              <button onClick={this.test} id={comment.comments_id} className="singleRecipeCommentEdit">
                          Test
                        </button>
                {ingredients? ingredients.map(ingredient => (
                      <li className="ingredientList" key={Math.random()}>
                        {ingredient.amount} {ingredient.name}
                      </li>
                    ))
                  :"There are no any ingredients"}
              </ul> */}

              <h3 className="singleRecipeIngredientsTitle"> Ingredients </h3>
              <ul type="none">
                {ingredients? ingredients.map(ingredient => (
                      <li className="ingredientList" key={Math.random()}>
                        {ingredient.amount} {ingredient.name}
                      </li>
                    ))
                  :"There are no any ingredients"}
              </ul>

              <h3 className="singleRecipeIngredientsTitle">Directions</h3>
              <p> {recipe}</p>
              <div id="calories_burned"></div>
              <h3 className="singleRecipeIngredientsTitle">
                {" "}
                Leave a comment{" "}
              </h3>

              <form onSubmit={this.handleSubmit}>
                <textarea
                  placeholder="leave your comment"
                  onInput={this.handleInputComment}
                  value={comment}
                  required
                />
                <button className="singleRecipeSubmit">Submit</button>
              </form>

              <h3 className="singleRecipeIngredientsTitle"> Comments </h3>
              <ul className="commentList" type="none">
                {comments
                  ? comments.map(comment => (
                      <p key={Math.random()}>
                        <strong>
                          {comment.username}
                        </strong>
                        {": "}
                        {comment.comment}{" "}
                        {comment.user_id === this.props.id ? (
                        <button onClick={this.handleClickEdit} id={comment.comments_id} className="singleRecipeCommentEdit">
                          Edit
                        </button>)
                        :
                        ""}
                        {comment.user_id === this.props.id ? (
                          <button onClick={this.handleClickDeleteComment} id={comment.comments_id} className="singleRecipeCommentEdit">
                            Delete
                          </button>)
                            :
                            ""}
                      </p>))
                  : "There are no any comments"}
              </ul>
            </div>
          </div>
        </div>
        </div>
      );
    } else {
      return <div>loading!</div>;
    }
  }
}
export default SingleRecipe;
