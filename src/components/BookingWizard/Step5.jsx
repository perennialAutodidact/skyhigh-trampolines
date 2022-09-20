import React, { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookingWizardContext } from "./context";
import { updateForm, setProgressBarStep } from "./context/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SignatureCanvas from "react-signature-canvas";
import { step5Schema } from "./schema";
import styles from "./BookingWizard.module.scss";
import { useEffect } from "react";

const Step5 = () => {
  const navigate = useNavigate();
  const signaturePadRef = useRef(null);
  const [state, dispatch] = useContext(BookingWizardContext);

  const initialValues = {
    waiverAgreed: false,
    signatureImageData: "",
  };
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(step5Schema),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(updateForm(formData));
    dispatch(setProgressBarStep(6));
    navigate("/booking/checkout");
  };

  const goBack = () => dispatch(setProgressBarStep(4));

  const clearSignature = () => {
    signaturePadRef.current && signaturePadRef.current.clear();
    setValue("signatureImageData", "");
  };

  const handleStrokeEnd = () =>
    setValue("signatureImageData", signaturePadRef.current.toDataURL());

  return (
    <div className="container pt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="container text-start">
        <h3 className="mb-3">Sign the Waiver</h3>
        <div className="container">
          <div className="waiver-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              natus animi unde, ex, sint, blanditiis ratione nemo et inventore
              voluptate similique quam consectetur commodi nam rerum ullam
              laboriosam! Iste culpa atque sapiente facere, impedit aspernatur
              eum aliquid? Voluptatem sapiente a cum ad, ex dolore hic, vitae
              repellat in beatae, accusamus molestiae veritatis voluptatum omnis
              enim eos? Impedit, eligendi dolorem? Unde quam illum dolore
              tempore cumque culpa, quisquam doloribus, quod aperiam similique
              in! Repudiandae illo illum facere aliquid magni a.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              earum suscipit magnam nemo eveniet dolorum odio, odit qui quasi.
              Beatae cumque autem inventore sequi deleniti aliquam provident
              numquam, eum vel?
            </p>
            {errors.waiverAgreed && (
              <p className="text-danger">{errors.waiverAgreed.message}</p>
            )}
          </div>
          <div className="row">
            <div className="col-1">
              <input
                type="checkbox"
                {...register("waiverAgreed")}
                className={`
                    form-check-input
                    ${errors.waiverAgreed && "is-invalid"}
                `}
              />
            </div>
            <div className="col-11">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corrupti obcaecati voluptatibus eveniet iure harum magnam
                repellendus a tempora odit aliquam, sed itaque. Eos animi quidem
                asperiores rerum expedita recusandae sint.
              </p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem vel,
            repellat autem illum maxime neque ab est expedita. Iste consectetur
            ex necessitatibus accusamus provident consequuntur dolor ut
            obcaecati quidem cum.
          </p>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <div>Sign Below</div>{" "}
                <div
                  onClick={clearSignature}
                  className={`${styles.clearSignatureButton}`}
                >
                  Clear
                </div>
              </div>
              <SignatureCanvas
                canvasProps={{
                  className: `
                    ${styles.signaturePad}
                    ${
                      errors.signatureImageData
                        ? "border-danger"
                        : "border-light"
                    } 
                    bg-light
                    border border-2 
                  `,
                }}
                onEnd={handleStrokeEnd}
                ref={signaturePadRef}
              />
            </div>
          </div>

          {errors.signatureImageData && (
            <p className="text-danger">{errors.signatureImageData.message}</p>
          )}

          <div className="row my-3 align-items">
            <div className="col-12 col-lg-2 p-0 mt-3 mt-lg-0 order-2 order-lg-1">
              <Link
                to="/booking/step-4"
                onClick={goBack}
                className="link-dark text-decoration-none"
              >
                Back
              </Link>
            </div>
            <div className="col-12 col-lg-4 offset-lg-6 p-0 order-1 order-lg-2">
              <button type="submit" className="btn btn-success w-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step5;
