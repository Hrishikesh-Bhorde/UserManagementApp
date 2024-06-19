import Navbar from "./Navbar";

function About() {
  return (
    <>
<Navbar />

<div className="container-xl mt-5">
    <h1 className=" font-semibold text-2xl">
Project Information
</h1>

<div className="mt-5">

<div className="mockup-code">
<pre data-prefix="#"><code>User Management Application part of Internship task assigned by Innobyte Services. <br /> Developed using ReactJs, TailwindCSS, Vite, NodeJs & ExpressJs.</code></pre> 
  <pre data-prefix="$"><code  className="text-success">Developed by : Hrishikesh Bhorde</code></pre> 
  <pre data-prefix=">" ><code className="text-warning">Email id : bhordehrishikesh@gmail.com</code></pre> 
  <pre data-prefix=">" ><code className="text-blue-500">GitHub Repository Link</code></pre>
  <pre data-prefix="$" ><code className="text-blue-500"><a href="https://www.github.com/Hrishikesh-Bhorde" target="_blank">Hrishikesh Bhorde <i className="bi bi-github text-gray-200"></i></a></code></pre>
</div>

</div>

    </div>
    </>
  )
}

export default About