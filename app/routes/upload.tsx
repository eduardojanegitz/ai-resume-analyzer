import React, { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

    console.log({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Feedback inteligente para o trabalho dos seus sonhos</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>
              Carregue seu currículo para uma pontuação ATS e melhore com dicas
              valiosas
            </h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Nome da empresa</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Nome do emprego</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Nome do emprego"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Descrição do emprego</label>
                <textarea
                  rows={5}
                  name="job-description"
                  id="job-description"
                  placeholder="Descrição do emprego"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Carregue seu currículo</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analise o currículo
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
