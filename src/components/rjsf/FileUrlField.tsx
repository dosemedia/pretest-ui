import { FieldProps } from '@rjsf/utils';
import React, { useContext, useState, useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from '../../stores/stores';
import axios from 'axios'
import { SpinningLoading } from '../lib/SpinningLoading';

// Based on https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields#custom-field-components

const FileUrlField: React.FC<FieldProps> = ({ formData, onChange, name }) => {
  const [busy, setBusy] = React.useState(false);
  const authStore = useContext(AuthContext)

  async function uploadCreativeAsset(file: File | null | undefined) {
    // post multipart/form-data to /files/user-avatar
    if (file) {
      setBusy(true)
      const form = new FormData()
      form.append('id', '2947982734-234235234-234234234')
      form.append('name', file.name)
      form.append('creative-assets', file)
      try {
        const response = await axios.post(authStore.filesBaseUrl + '/files/creative-assets', form, {
          headers: {
            Authorization: 'Bearer ' + authStore.token
          }
        })
        return response.data
      } catch (e) {
        setBusy(false)
        return new Error(e as string)
      }
    }
  }

  const uploadCreativeAssetMutation = useMutation({
    mutationFn: (files: FileList | null) => uploadCreativeAsset(files?.item(0)),
    onSuccess: (data) => { handleNewUrl(authStore.filesBaseUrl + '/files/creative-assets/' + data.key) }

  })

  const handleNewUrl = async (url: string) => {
    onChange(url)
    setBusy(false);
  }

  return (
    <div>
      {busy && <SpinningLoading isLoading={busy} />}
      <label className="label">
        <span className="text-sm opacity-60">{name}</span>
      </label>
      {formData ? <img src={formData} style={{ width: 150 }} /> : <input type="file" className="file-input w-full max-w-xs" onChange={(e) => uploadCreativeAssetMutation.mutate(e.target.files)} />}
    </div>
  );
}

export default FileUrlField;
