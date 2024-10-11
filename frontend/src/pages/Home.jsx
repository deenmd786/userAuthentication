import Button from '../components/Button'; // Import the Button component

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600">Welcome to Our Site!</h1>
        <p className="mt-4 text-lg text-gray-700">
          This is your go-to platform for amazing content.
        </p>
        <Button text="Get Started" onClick={() => alert('Button Clicked!')} className="mt-6" />
      </div>
    </div>
  );
};

export default Home;
