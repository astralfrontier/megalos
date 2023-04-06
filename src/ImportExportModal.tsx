import React, { useState } from 'react'

interface ImportExportModalProps {
  exportedText: string
  importFunction?: (text: string) => void
}

function ImportExportModal(props: ImportExportModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { exportedText, importFunction } = props

  const buttonLabel = importFunction ? 'Import/Export' : 'Export'

  return (
    <>
      <button
        className="button is-primary"
        onClick={() => setModalVisible(true)}
      >
        {buttonLabel}
      </button>
      <div className={modalVisible ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{buttonLabel}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModalVisible(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <textarea className="textarea" value={exportedText} rows={8} />
          </section>
          {importFunction ? (
            <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Cancel</button>
            </footer>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default ImportExportModal
