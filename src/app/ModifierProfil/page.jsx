"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import FeatherIcon from "feather-icons-react";
import Sidebar from "@components/Sidebar";
import { getMedecinById, updateMedecin } from "../../services/medecinService";
import { Profileuser, cameraicon } from "../../components/imagepath";
import "../../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MonProfile = () => {
  const [medecin, setMedecin] = useState(null);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    specialite: "",
    mail: "",
    estGeneraliste: false,
    estMedcinESJ: false,
    cin: "",
    inpe: "",
    ppr: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedecin = async () => {
      try {
        setLoading(true);
        const id = 1; // Get the ID dynamically
        const medecinData = await getMedecinById(id);
        setMedecin(medecinData);
        setFormData({
          prenom: medecinData.prenom,
          nom: medecinData.nom,
          cin: medecinData.cin,
          inpe: medecinData.inpe,
          ppr: medecinData.ppr,
          specialite: medecinData.specialite,
          mail: medecinData.mail,
          estGeneraliste: medecinData.estGeneraliste,
          estMedcinESJ: medecinData.estMedcinESJ,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medecin data", error);
        toast.error("Failed to fetch medecin data.");
        setLoading(false);
      }
    };

    fetchMedecin();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const { prenom, nom, mail } = formData;
    if (!prenom || !nom || !mail) {
      toast.error("Prénom, Nom, and Email are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const id = 1; // Get the ID dynamically
      await updateMedecin(id, formData);
      console.log("Success toast should appear"); // Debugging statement
      toast.success("Profile updated successfully!");
      setLoading(true);
    } catch (error) {
      console.error("Failed to update medecin data", error);
      console.log("Error toast should appear"); // Debugging statement
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Sidebar
        id="menu-item1"
        id1="menu-items1"
        activeClassName="doctorprofile"
      />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="doctors.html">Medecins</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                      <FeatherIcon icon="chevron-right" />
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Profil Medecin</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="about-info">
                        <h4>
                          Profil du Docteur
                          <span>
                            <Link href="#">
                              <i className="feather-more-vertical">
                                <FeatherIcon icon="more-vertical" />
                              </i>
                            </Link>
                          </span>
                        </h4>
                      </div>
                      <div className="doctor-profile-head">
                        <div className="row">
                          <div className="profile-user-box">
                            <div className="profile-user-img">
                              <img src={Profileuser.src} alt="Profile" />
                              <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                <div className="uplod d-flex">
                                  <label className="file-upload profile-upbtn mb-0">
                                    <img src={cameraicon.src} alt="Profile" />
                                    <input type="file" />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="names-profiles">
                              <h4>
                                {medecin?.prenom} {medecin?.nom}
                              </h4>
                              <h5>{medecin?.specialite}</h5>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "15px",
                                justifyContent: "flex-end",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {/* LinkedIn Link */}
                                <a
                                  className="btn"
                                  href={formData.linkedin}
                                  style={{
                                    borderColor: "transparent",
                                    color: "black",
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    backgroundColor: "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div
                                    className="personal-icons"
                                    style={{ marginRight: "8px" }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLinkedin}
                                      style={{
                                        color: "#0077B5",
                                        fontSize: "24px",
                                      }}
                                    />
                                  </div>
                                </a>
                                {/* Twitter Link */}
                                <a
                                  className="btn"
                                  href={formData.twitter}
                                  style={{
                                    borderColor: "transparent",
                                    color: "grey",
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    backgroundColor: "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div
                                    className="personal-icons"
                                    style={{ marginRight: "8px" }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faXTwitter}
                                      style={{
                                        color: "#000000",
                                        fontSize: "24px",
                                      }}
                                    />
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label>À propos de moi</label>
                              <textarea
                                className="form-control"
                                name="about"
                                rows="4"
                                value={formData.about || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Prénom</label>
                              <input
                                type="text"
                                className="form-control"
                                name="prenom"
                                value={formData.prenom || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Nom</label>
                              <input
                                type="text"
                                className="form-control"
                                name="nom"
                                value={formData.nom || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Spécialité</label>
                              <input
                                type="text"
                                className="form-control"
                                name="specialite"
                                value={formData.specialite || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Sexe</label>
                              <select
                                className="form-control"
                                name="sexe"
                                value={formData.sexe || ""}
                                onChange={handleInputChange}
                              >
                                <option value="M">Homme</option>
                                <option value="F">Femme</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="mail"
                                value={formData.mail || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>CIN</label>
                              <input
                                type="text"
                                className="form-control"
                                name="cin"
                                value={formData.cin || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>PPR</label>
                              <input
                                type="text"
                                className="form-control"
                                name="ppr"
                                value={formData.ppr || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>INPE</label>
                              <input
                                type="text"
                                className="form-control"
                                name="inpe"
                                value={formData.inpe || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Est Généraliste</label>
                              <input
                                type="checkbox"
                                name="estGeneraliste"
                                checked={formData.estGeneraliste}
                                onChange={handleCheckboxChange}
                              />
                            </div>
                            <div className="form-group">
                              <label>Est Médecin ESJ</label>
                              <input
                                type="checkbox"
                                name="estMedcinESJ"
                                checked={formData.estMedcinESJ}
                                onChange={handleCheckboxChange}
                              />
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Mettre à jour
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default MonProfile;
