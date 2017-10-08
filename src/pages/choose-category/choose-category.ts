import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CategoryModel } from '../../Models/category.model';
import { AuthService } from '../../services/auth.service';
import { RoundModel } from '../../Models/round.model';

@IonicPage()
@Component({
  selector: 'page-choose-category',
  templateUrl: 'choose-category.html',
})
export class ChooseCategoryPage {

  categoryName: string;
  categories: CategoryModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase,
              private authService: AuthService) {
    let pokemon: CategoryModel = {
      title: "Pokemon",
      description: "Catch'em all!",
      url:  "assets/pokemonIcon.png"
    }
    let movies: CategoryModel = {
      title: "Movies",
      description: "Did you watch it?!",
      url:  "assets/moviesIcon.png"
    }
    let location: CategoryModel = {
      title: "Locations",
      description: "What dould you take to...?",
      url:  "assets/locationIcon.png"
    }
    let food: CategoryModel = {
      title: "Food",
      description: "Yammmm....",
      url:  "assets/foodIcon.png"
    }
    let celeb: CategoryModel = {
      title: "Celebs",
      description: "I know him!",
      url:  "assets/celebIcon.png"
    }

    this.categories.push(pokemon);
    this.categories.push(movies);
    this.categories.push(location);
    this.categories.push(food);
    this.categories.push(celeb);
  }

  select(category: CategoryModel) {
    let roomKey = this.navParams.get('roomKey');
    this.af.object(`/rooms/${roomKey}/isCategorySelected`).set(true);

    let round: RoundModel = {
      categoryName: category.title,
      selectorKey: this.authService.currentUser.displayName,
      spyKey: this.navParams.get('spy'),
      roomKey: roomKey
    }


    // add game to db
    let roundKey = this.af.list(`rounds/`).push(round).key;

    this.navCtrl.push('GamePage', { 
      roomKey: roomKey,
      roundKey: roundKey
    });
  }

}
