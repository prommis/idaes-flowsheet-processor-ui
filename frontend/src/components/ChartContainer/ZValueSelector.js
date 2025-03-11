const ZValueSelector = ({ zOptions, selectedZ, handleChange, multiple }) => {
  return (
    <Autocomplete
      multiple={multiple}
      options={zOptions}
      value={selectedZ}
      onChange={(event, newValue) => handleChange(event, newValue)}
      renderInput={(params) => <TextField {...params} label="Select Parameter" variant="outlined" />}
      getOptionLabel={(option) => option}
      renderOption={(option) => (
        <React.Fragment key={option}>
          {option}
        </React.Fragment>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
};

export default ZValueSelector;
