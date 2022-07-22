# Resfish App

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<img src="https://user-images.githubusercontent.com/62571814/180497067-1a586e15-91da-43b5-81cc-88279de64a0e.png" alt="resfish-app"/>

> A system for fishing/restaurants. The restaurant can create and manipulate commands containing the products purchased by their customers. There's a stock containing all the products and its informations. In the final of the day the restaurant can close the cashier and receive the information of all the purchases of that day. There's a section where is for the kithen receive in real-time the stuffs to be prepared.

## 💻 How it works

#### The system has 4 main sections
- ### Home: In this section the user can access all of the orders payed of some date chosen, close cashier of some date and access all of the cashiers already closed. In the cashiers closed the user is able to select by month and year and receive informations about the payments.
![resfish-home](https://user-images.githubusercontent.com/62571814/180468394-20b34096-7518-4a7e-bcf1-6dec4a92d9bf.gif)

<hr />

- #### Orders: In this part of application the user is able to create new orders of customers and add products to the order, as well edit or delete orders. The user can access all of the orders that is opened or that already has been paid.
![resfish-orders](https://user-images.githubusercontent.com/62571814/180469497-5bee461d-499e-4b4a-a09e-02e1304c08a7.gif)

<hr />

- #### Specific Order: In orders page the user can clicks in some order and see and manipulate all of the products and its information, as well add more products to the order. The user can make many payments of different type in the order. Can set discount to the order and finally the user is able to close the cashier.
![resfish-command-1](https://user-images.githubusercontent.com/62571814/180471774-01087237-70cb-4547-a65b-43a958d62fd2.gif)
![resfish-command-2](https://user-images.githubusercontent.com/62571814/180472215-30467411-4942-4b39-bd33-dd331d7881b1.gif)

<hr />

- #### Kitchen: The people of the restaurant kitchen can receive in real-time of waiters what needs to be prepared;
![resfish-kitchen](https://user-images.githubusercontent.com/62571814/180474135-05bfd91c-f964-4c98-85cd-7353e3720057.gif)

<hr />

- #### Stock: Here the user has full access of the products of the restaurant, being able to create new products and edit or delete products. The system takes care of the control of stock, so when one product is added in some order the amount of that product in stock is modified.
![resfish-stock](https://user-images.githubusercontent.com/62571814/180475400-6ac89d9a-f9a5-498e-8a38-38aa3a91c0f4.gif)

## :hammer: How it was made

  To build the interface I've used Next.js and ChakraUI. The client is being connected to an API made by using Node.js and MongoDB;

## 🚀 Technologies used in project

- Next.js
- TypeScript
- ChakraUI
- Node.js
- MongoDB

To contribute, follow the next steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and confirm them: `git commit -m '<commit_message>'`
4. Send to the main branch: `git push origin <project_name> / <local>`
5. Create the pull request.

As an alternative, check the documentation of the Github to lear how to make a pull request: (https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Developer

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://github.com/bryanmaraujo544.png" width="100px;" alt="Bryan's profile photo"/><br>
        <sub>
          <b>Bryan Martins</b>
        </sub>
      </a>
    </td>

</table>

