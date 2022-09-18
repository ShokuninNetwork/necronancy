pub enum Resolution<Balance> {
    SlashDepositAndClose,
    ReleaseDepositAndClose,
    PartialRelease(Balance),
    PartialSlash(Balance),
}

pub trait DisputeHandler<IdType, Balance> {
 fn report_misbehaviour(deposit_id: IdType);
 fn resolve_dispute(dispute_id: IdType, outcome: Resolution<Balance>);
}