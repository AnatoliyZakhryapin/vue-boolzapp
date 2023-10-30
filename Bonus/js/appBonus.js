const { createApp } = Vue;

createApp({
    data() {
        return {
			event: 'input',
            currentIndex: 3,
            searchText: "",
            printedText: "",
            status: false,
            contacts: [
				{
					name: 'Michele',
					avatar: './img/avatar_1.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Hai portato a spasso il cane?',
							isActiveMenu: false,
							status: 'sent',
						},
						{
							date: '10/01/2020 15:50:00',
							message: 'Ricordati di stendere i panni',
							status: 'sent',
						},
						{
							date: '10/01/2020 16:15:22',
							message: 'Tutto fatto!',
							status: 'received',
						},
					],
				},
				{
					name: 'Fabio',
					avatar: './img/avatar_2.jpg',
					visible: true,
					messages: [
						{
							date: '20/03/2020 16:30:00',
							message: 'Ciao come stai?',
							status: 'sent',
						},
						{
							date: '20/03/2020 16:30:55',
							message: 'Bene grazie! Stasera ci vediamo?',
							status: 'received',
						},
						{
							date: '20/03/2020 16:35:00',
							message: 'Mi piacerebbe ma devo andare a fare la spesa.',
							status: 'sent',
						},
					],
				},
				{
					name: 'Samuele',
					avatar: './img/avatar_3.jpg',
					visible: true,
					messages: [
						{
							date: '28/03/2020 10:10:40',
							message: 'La Marianna va in campagna',
							status: 'received',
						},
						{
							date: '28/03/2020 10:20:10',
							message: 'Sicuro di non aver sbagliato chat?',
							status: 'sent',
						},
						{
							date: '28/03/2020 16:15:22',
							message: 'Ah scusa!',
							status: 'received',
						},
					],
				},
				{
					name: 'Alessandro B.',
					avatar: './img/avatar_4.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Lo sai che ha aperto una nuova pizzeria?',
							status: 'sent',
						},
						{
							date: '10/01/2020 15:50:00',
							message: 'Si, ma preferirei andare al cinema',
							status: 'received',
						},
					],
				},
				{
					name: 'Alessandro L.',
					avatar: './img/avatar_5.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Ricordati di chiamare la nonna',
							status: 'sent',
						},
						{
							date: '10/01/2020 15:50:00',
							message: 'Va bene, stasera la sento',
							status: 'received',
						},
					],
				},
				{
					name: 'Claudia',
					avatar: './img/avatar_6.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Ciao Claudia, hai novità?',
							status: 'sent',
						},
						{
							date: '10/01/2020 15:50:00',
							message: 'Non ancora',
							status: 'received',
						},
						{
							date: '10/01/2020 15:51:00',
							message: 'Nessuna nuova, buona nuova',
							status: 'sent',
						},
					],
				},
				{
					name: 'Federico',
					avatar: './img/avatar_7.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Fai gli auguri a Martina che è il suo compleanno!',
							status: 'sent',
						},
						{
							date: '10/01/2020 15:50:00',
							message: 'Grazie per avermelo ricordato, le scrivo subito!',
							status: 'received',
						},
					],
				},
				{
					name: 'Davide',
					avatar: './img/avatar_8.jpg',
					visible: true,
					messages: [
						{
							date: '10/01/2020 15:30:55',
							message: 'Ciao, andiamo a mangiare la pizza stasera?',
							status: 'received',
						},
						{
							date: '10/01/2020 15:50:00',
							message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
							status: 'sent',
						},
						{
							date: '10/01/2020 15:51:00',
							message: 'OK!!',
							status: 'received',
						},
					],
				},
			],
        }
    },
    methods: {
        addMessage(index){
            const statusMessage = this.contacts[this.currentIndex].messages[index].status
            if(statusMessage === 'sent') {
                return 'sent';
            } else {
                return 'received';
            }
        },
        getActive(index){
            this.currentIndex = index;
        },
        sendMessage(){
            const text = this.printedText;
            const message = {
                date: this.time(),
                message: text,
                status: 'sent',
            };
            this.contacts[this.currentIndex].messages.push(message)
            this.printedText = "";
            this.status = true;
        },
        answerMessage(){
            setTimeout(() => {
                const text = "ok";
                const message = {
                    date: this.time(),
                    message: text,
                    status: 'received',
                };
                if(this.status === true){
                    this.contacts[this.currentIndex].messages.push(message)
                }
                this.status = false;
            }, 1000)
        },
        filtrContact(){
            const textToControl = this.searchText.toLowerCase()
            const array = this.contacts
            console.log(array)
            console.log(textToControl)
            for(let i = 0; i < array.length; i++){
                const name = array[i].name.toLowerCase()
                console.log(name)
                array[i].visible = true;
                if(name.match(textToControl) === null){
                    array[i].visible = false;
                }
            }
        },
		deleteMessage(index){
			this.contacts[this.currentIndex].messages[index].isDeleted = !this.contacts[this.currentIndex].messages[index].isDeleted
			console.log(this.contacts[this.currentIndex].name,
				this.contacts[this.currentIndex].messages[index].message,
				this.contacts[this.currentIndex].messages[index].isDeleted
				)
			this.activeMenuMessage(index)
		},
		deleteMessageCompletely(index){
			this.contacts[this.currentIndex].messages.splice(index,1)
			
		},
		activeMenuMessage(index){
			this.contacts[this.currentIndex].messages[index].isActiveMenu = !this.contacts[this.currentIndex].messages[index].isActiveMenu
		},
		viewLastMessage(contact){
			const array = contact.messages
			const lastIndex = array.length - 1;
			const message = array[lastIndex].message
			let messageToPrint = "";
			const messageCut = message.slice(0,28);
			if(message.length > 28){
				messageToPrint = messageCut + "...";
			} else {
				messageToPrint = message;
			}
			return messageToPrint;
		},
		viewLastMessageTime(contact){
			const array = contact.messages
			const lastIndex = array.length - 1;
			const lastTime = array[lastIndex].date
			let ms = Date.parse(lastTime);
			console.log(typeof(ms), ms)
			const d = new Date();
			console.log(typeof(d), d)
			let hour = d.getHours();
			let minutes = d.getMinutes();
			const timeToPrint = `${hour}:${minutes}`
			console.log(timeToPrint)
			return timeToPrint;
		},
		time() {
			const d = new Date();
			const day = d.getDate();
			const mounth = d.getMonth() + 1;
			const year = d.getFullYear();
			console.log(day,mounth, year)
			const hour = d.getHours();
			const minutes = d.getMinutes();
			const seconds = d.getSeconds();
			const printTime = `${day}/${mounth}/${year} ${hour}:${minutes}:${seconds}`;
		  	return printTime;
		},
		timeChat(date){
			let ms = Date.parse(date);
			console.log(typeof(ms), ms)
			const d = new Date();
			console.log(typeof(d), d)
			let hour = d.getHours();
			let minutes = d.getMinutes();
			const timeToPrint = `${hour}:${minutes}`
			console.log(timeToPrint)
			return timeToPrint;
		}
    },
	// computed: {
	// 	time() {
	// 		const d = new Date();
	// 		let hour = d.getHours();
	// 		let minut = d.getMinutes();
	// 		let printTime = hour + ":" + minut
	// 	  return printTime;
	// 	}
	//   },
	mounted() {
        console.log("VUE OK")

    }
}).mount("#app")