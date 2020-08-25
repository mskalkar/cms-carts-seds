export const selectSectionByOrdinal = (state, ordinal) => {
  const section = state.formData.filter(
    (c) => c.contents.section.ordinal === ordinal
  );
  if (section.length > 0) {
    return section[0].contents;
  }
  return null;
};
