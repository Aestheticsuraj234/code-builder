# AI-Powered Code Generation Application

This project is a web application that leverages AI to assist developers in generating code snippets and understanding code structures. Built with modern technologies, it offers a seamless and efficient user experience.

## Features

- **AI-Powered Code Generation:** Utilizes a locally running DeepSeek model to generate code snippets based on user prompts.
- **Interactive File Structure:** Displays a dynamic file structure that updates in real-time as code is generated.
- **Responsive Design:** Ensures optimal viewing across various devices using Tailwind CSS.
- **Reusable Components:** Employs Shadcn UI components for a consistent and customizable UI.

## Technologies Used

- **Next.js:** A React framework for building server-side rendered applications.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn UI:** A library of customizable UI components based on Tailwind CSS.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Prisma:** An ORM for Node.js and TypeScript, facilitating database interactions.
- **MongoDB:** A NoSQL database for storing user data and generated code snippets.
- **DeepSeek:** A locally running AI model for code generation.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Aestheticsuraj234/code-builder.git
   cd code-builder
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   DEEPSEEK_API_URL=http://localhost:5000/generate
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

4. **Run the Application:**

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

- **Generate Code Snippets:** Enter a prompt in the input field, and the AI will generate a corresponding code snippet.
- **Explore File Structure:** Navigate through the dynamically generated file structure to view related code files.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

---

For more detailed guides on integrating Shadcn UI with Next.js and Tailwind CSS, you can refer to the following resources:

- [How to use Shadcn UI with NextJS and Tailwind CSS](https://mydevpa.ge/blog/how-to-use-shadcn-ui-with-nextjs-and-tailwind-css)
- [Next.js, Tailwind CSS and Shadcn-ui template](https://dev.to/hunchodotdev/nextjs-tailwind-css-and-shadcn-ui-template-528n)

These guides provide step-by-step instructions and best practices for setting up and customizing your application. 