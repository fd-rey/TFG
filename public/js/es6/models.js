/*jshint esversion: 6 */


class Observable{
	constructor(){
		this.observers = [];
	}
	addObserver(observer){
		this.observers.push(observer);
	}
	removeObserver(observer){
		for (let x = 0; x < this.observers.length; x++){
			if (this.observers[x] == observer){
				this.observers.slice(x,1);
				return;
			}
		}
	}
	notifyObservers(){
		this.observers.forEach(observer =>{
			observer.notify();
		});
	}
}
class Session {
	constructor(user, target=null){
		this.user = user;
		this.target = target;
	}

	setTarget(target){
		this.target = target;
		this.notifyObservers();
	}
}

class User {
	constructor(name, avatar, uuid){
		this.name = name;
		this.avatar = avatar;
		this.uuid = uuid;
	}
}