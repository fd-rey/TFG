/*jshint esversion: 6 */
class View {
	constructor(domElements, controller){
		this.domElements = [];
		this.controller = controller;
	}
	init(){}
	
	show(){
		this.domElements.forEach(element =>{
			element.hidden = false;
		});
	}
	hide(){
		this.domElements.forEach(element =>{
			element.hidden = true;
		});
	}
	
	render(){console.log('aloha');}
}

class ListView extends View {

	constructor(listId, controller = null){
		super([], controller);
		this.container = document.getElementById(listId);
		this.domElements.push(this.list);
	}

	render(){
		
		//clean the list
		while(this.container.firstChild){
			this.container.removeChild(this.container.firstChild);
		}
		let users = this.controller.getList();
		//fill it with updates
		users.forEach(user =>{
			// //Add the user to the list of connected users

			var item = document.createElement('a');
			var icon = document.createElement('i');
			icon.appendChild(document.createTextNode('call'));
			icon.className = 'tiny material-icons secondary-content';
			item.appendChild(document.createTextNode(user));
			item.appendChild(icon);
			item.addEventListener("click", this.controller.engage);
			item.id = user;
			item.className='center-align collection-item';
			
			this.container.appendChild(item);

		});
	}

}