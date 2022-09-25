import React, { useRef } from "react";
import styles from "./Waiver.module.scss";
import SignatureCanvas from "react-signature-canvas";

const Waiver = ({ register, setValue, errors, clearErrors }) => {
  const signaturePadRef = useRef(null);

  const clearSignature = (e) => {
    signaturePadRef.current && signaturePadRef.current.clear();
    setValue("signatureImageData", "");
  };

  const handleStrokeEnd = () => {
    setValue("signatureImageData", signaturePadRef.current.toDataURL());
    clearErrors("signatureImageData");
  };

  return (
    <div className="container">
      <div className="waiver-body">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          natus animi unde, ex, sint, blanditiis ratione nemo et inventore
          voluptate similique quam consectetur commodi nam rerum ullam
          laboriosam! Iste culpa atque sapiente facere, impedit aspernatur eum
          aliquid? Voluptatem sapiente a cum ad, ex dolore hic, vitae repellat
          in beatae, accusamus molestiae veritatis voluptatum omnis enim eos?
          Impedit, eligendi dolorem? Unde quam illum dolore tempore cumque
          culpa, quisquam doloribus, quod aperiam similique in! Repudiandae illo
          illum facere aliquid magni a.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur earum
          suscipit magnam nemo eveniet dolorum odio, odit qui quasi. Beatae
          cumque autem inventore sequi deleniti aliquam provident numquam, eum
          vel?
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
                    ${errors.waiverAgreed ? "is-invalid" : ""}
                `}
          />
        </div>
        <div className="col-11">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
            obcaecati voluptatibus eveniet iure harum magnam repellendus a
            tempora odit aliquam, sed itaque. Eos animi quidem asperiores rerum
            expedita recusandae sint.
          </p>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem vel,
        repellat autem illum maxime neque ab est expedita. Iste consectetur ex
        necessitatibus accusamus provident consequuntur dolor ut obcaecati
        quidem cum.
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
    </div>
  );
};

export default Waiver;
