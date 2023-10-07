var api_key = "215e3cf584a3ecfaec0f";

Pusher.logToConsole = true;

var pusher = new Pusher(api_key, {
  cluster: "ap2",
});

var bookForm = document.getElementById("book-form");

const addbook = (e) => {
  e.preventDefault();

  const newBook = document.getElementById("book-name").value;

  fetch("http://localhost:3000/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      book: newBook,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json.message);
    });
};

if (bookForm) {
  bookForm.addEventListener("submit", addbook);
}

var channel = pusher.subscribe("channel-name");
channel.bind("add", function (data) {
  console.log(data.books);

  var length = data.books.length;
  $("#books-list").append(
    $("<li>").html("<b>" + data.books[length - 1] + "</b>")
  );
});
