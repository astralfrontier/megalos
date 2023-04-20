import React, { useEffect, useState } from 'react'

interface ImportExportModalProps {
  exportedText: string
  importFunction?: (text: string) => void
}

function ImportExportModal(props: ImportExportModalProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const { exportedText, importFunction } = props

  useEffect(() => {
    setContent(exportedText)
  }, [exportedText])

  function copyToClipboard() {
    navigator.clipboard.writeText(content)
    alert('Copied')
  }

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
            <textarea
              className="textarea"
              value={content}
              onChange={(event) => setContent(event.currentTarget.value)}
              rows={8}
            />
          </section>
          <footer className="modal-card-foot">
            {importFunction ? (
              <button
                className="button is-success"
                onClick={() => {
                  importFunction(content)
                  setModalVisible(false)
                }}
              >
                Import
              </button>
            ) : (
              <></>
            )}
            <button className="button is-success" onClick={copyToClipboard}>
              Copy
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default ImportExportModal
