var addQuest = document.getElementsByTagName("button")[0];
var incompleteQuestsContainer = document.getElementById("incomplete-quests");
var questAdder = document.getElementById("new-quest"); 
var completedQuestsContainer= document.getElementById("completed-quests");

var createNewQuestElement = function(questString) {

  var liItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var inputEdit = document.createElement("input"); 
  var buttonEdit = document.createElement("button");
  var buttonDelete = document.createElement("button");
  
  checkBox.type = "checkbox";
  inputEdit.type = "text";
  buttonEdit.innerText = "Edit";
  buttonEdit.className = "edit";
  buttonDelete.innerText = "Delete";
  buttonDelete.className = "delete";
  label.innerText = questString;

  liItem.appendChild(checkBox);
  liItem.appendChild(label);
  liItem.appendChild(inputEdit);
  liItem.appendChild(buttonEdit);
  liItem.appendChild(buttonDelete);

  return liItem;
}

var addQuestAct = function() {
  var liItem = createNewQuestElement(questAdder.value);
  incompleteQuestsContainer.appendChild(liItem);
  bindQuestEvents(liItem, questCompleted);
  questAdder.value = "";
}

var editQuest = function() {
  var liItem = this.parentNode;
  var inputEdit = liItem.querySelector("input[type=text");
  var label = liItem.querySelector("label");
  var containsClass = liItem.classList.contains("editMode");
  if(containsClass) {
    label.innerText = inputEdit.value;
  } else {
    inputEdit.value = label.innerText;
  }
  liItem.classList.toggle("editMode");
}

var deleteQuest = function() {
  var liItem = this.parentNode;
  var ul = liItem.parentNode;
  ul.removeChild(liItem);
}

var questCompleted = function() {
  var liItem = this.parentNode;
  completedQuestsContainer.appendChild(liItem);
  bindQuestEvents(liItem, questIncomplete);
}

var questIncomplete = function() {
  var liItem = this.parentNode;
  incompleteQuestsContainer.appendChild(liItem);
  bindQuestEvents(liItem, questCompleted);
}

var bindQuestEvents = function(questLiItem, checkBoxEventHandler) {
  var checkBox = questLiItem.querySelector("input[type=checkbox]");
  var buttonEdit = questLiItem.querySelector("button.edit");
  var buttonDelete = questLiItem.querySelector("button.delete");
  buttonEdit.onclick = editQuest;
  buttonDelete.onclick = deleteQuest;
  checkBox.onchange = checkBoxEventHandler;
}

addQuest.addEventListener("click", addQuestAct);

for(var i = 0; i < incompleteQuestsContainer.children.length; i++) {
  bindQuestEvents(incompleteQuestsContainer.children[i], questCompleted);
}

for(var i = 0; i < completedQuestsContainer.children.length; i++) {
  bindQuestEvents(completedQuestsContainer.children[i], questIncomplete);
}

































