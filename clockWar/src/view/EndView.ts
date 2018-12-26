class EndView extends View {

    public static m_UI: EndViewSkin;

    public constructor ()
    {
        super ();
        DialogManager.remove("GameView");
    }

    public createChildren ()
    {
        super.createChildren ();
        EndView.m_UI = new EndViewSkin ();
        this.addChild( EndView.m_UI );
    }
}

class EndViewSkin extends eui.Component
{
    public constructor ()
    {
        super ();

        this.skinName = "src/skins/EndSkin.exml";
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
    }

}